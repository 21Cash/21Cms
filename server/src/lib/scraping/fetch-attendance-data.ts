import { Page } from "puppeteer";
import { cmsUrl } from "../../constants";
import loginIntoCMS from "./login-cms";

interface CourseData {
  course: string;
  classesHeld: number;
  classesPresent: number;
}

interface AttendanceData {
  username: string;
  totalClassesHeld: number;
  totalClassesAttended: number;
  attendancePercentage: number;
  coursesData: CourseData[];
}

const gotoAttendancePage = async (page: Page): Promise<Page | null> => {
  await page.goto(`${cmsUrl}/AttendanceRegister/`);
  try {
    await page.waitForSelector("#lblgenarate", { timeout: 5000 });
    return page;
  } catch (error) {
    console.log("Attendance page not found or timed out");
    return null;
  }
};

const fetchAttendanceData = async (
  username: string,
  password: string
): Promise<AttendanceData> => {
  let page = await loginIntoCMS(username, password);
  if (!page) {
    throw new Error(
      `Failed to login with username: ${username} and password: ${password}`
    );
  }
  page = await gotoAttendancePage(page);
  if (!page) {
    throw new Error(`Failed to navigate to attendance page`);
  }
  try {
    await page.waitForSelector("#lblworkingdays");
    const totalClassesHeld = await page.$eval("#lblworkingdays", (el) =>
      parseInt((el as HTMLElement).innerText.trim())
    );
    const totalClassesAttended = await page.$eval("#lblpresentdays", (el) =>
      parseInt((el as HTMLElement).innerText.trim())
    );
    const attendancePercentage = await page.$eval("#lblpercentage", (el) =>
      parseFloat((el as HTMLElement).innerText.trim())
    );
    const name = await page.$eval("#lblreportdate", (el) =>
      (el as HTMLElement).innerText.trim()
    );

    const iframeUrl = await page.$eval("#iframe_atten_report", (el) =>
      (el as HTMLIFrameElement).getAttribute("src")
    );
    if (!iframeUrl) {
      throw new Error("Graph iframe URL not found.");
    }

    const baseUrl = page.url();
    const graphUrl = new URL(iframeUrl, baseUrl).toString();

    await page.goto(graphUrl, { waitUntil: "networkidle2" });
    await page.waitForSelector(".visualize-labels-x li");

    const coursesData: CourseData[] = await page.evaluate(() => {
      const table = document.querySelector("table");
      if (!table) return [];

      const headerCells = Array.from(table.querySelector("thead tr").children);

      let courseClassesHeldData: {
        course: string;
        classesHeld: number;
      }[] = [];

      headerCells.forEach((cell, i) => {
        const headerText = cell.textContent?.trim();

        if (!headerText) {
          courseClassesHeldData.push(null);
          return;
        }

        const match = headerText.match(/^(.+)\((\d+)\)$/);
        if (!match) {
          courseClassesHeldData.push(null);
          return;
        }

        const course = match[1];
        const classesHeld = parseInt(match[2], 10);

        courseClassesHeldData.push({ course, classesHeld });
      });

      const row = table.querySelector("tbody tr");
      const cells = Array.from(row.querySelectorAll("td"));

      let courseDataIndex = 1;

      let coursesAttendanceData: CourseData[] = [];

      cells.forEach((cell) => {
        const presentClassesCount =
          cell.textContent === "" ? 0 : parseInt(cell.textContent);

        if (courseDataIndex >= courseClassesHeldData.length) {
          throw Error(
            "Ran out of courses held data list, courses data list is not 1 greater than present list"
          );
        }

        if (courseClassesHeldData[courseDataIndex]) {
          coursesAttendanceData.push({
            course: courseClassesHeldData[courseDataIndex].course,
            classesHeld: courseClassesHeldData[courseDataIndex].classesHeld,
            classesPresent: presentClassesCount,
          });
        }

        courseDataIndex++;
      });

      return coursesAttendanceData;
    });

    const attendanceData = {
      username,
      totalClassesHeld,
      totalClassesAttended,
      attendancePercentage,
      coursesData,
    };

    return attendanceData;
  } catch (error) {
    console.log("Failed to extract attendance data");
    await page.close();
    throw error;
  } finally {
    if (page) {
      await page.close();
    }
  }
};

export default fetchAttendanceData;
