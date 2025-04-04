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
    throw new Error(`Failed to login with username: ${username}`);
  }

  page = await gotoAttendancePage(page);
  if (!page) {
    throw new Error(`Failed to navigate to attendance page`);
  }

  try {
    const [totalClassesHeld, totalClassesAttended, attendancePercentage] =
      await Promise.all([
        page.$eval("#lblworkingdays", (el) =>
          parseInt((el as HTMLElement).innerText.trim())
        ),
        page.$eval("#lblpresentdays", (el) =>
          parseInt((el as HTMLElement).innerText.trim())
        ),
        page.$eval("#lblpercentage", (el) =>
          parseFloat((el as HTMLElement).innerText.trim())
        ),
      ]);

    const iframeUrl = await page.$eval("#iframe_atten_report", (el) =>
      (el as HTMLIFrameElement).getAttribute("src")
    );
    if (!iframeUrl) {
      throw new Error("Graph iframe URL not found.");
    }
    const baseUrl = page.url();
    const graphUrl = new URL(iframeUrl, baseUrl).toString();

    await page.goto(graphUrl, { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".visualize-labels-x li");

    const coursesData: CourseData[] = await page.evaluate(() => {
      const table = document.querySelector("table");
      if (!table) return [];

      const headerCells = Array.from(table.querySelector("thead tr").children);
      const courseClassesHeldData = headerCells.map((cell) => {
        const headerText = cell.textContent?.trim();
        const match = headerText?.match(/^(.+)\((\d+)\)$/);
        return match
          ? { course: match[1], classesHeld: parseInt(match[2], 10) }
          : null;
      });

      const row = table.querySelector("tbody tr");
      if (!row) return [];
      const cells = Array.from(row.querySelectorAll("td"));

      let courseDataIndex = 1; // skipping the first cell data, as the site gives out data in this way
      const coursesAttendanceData: CourseData[] = [];

      cells.forEach((cell) => {
        const presentClassesCount = cell.textContent?.trim()
          ? parseInt(cell.textContent.trim())
          : 0;
        if (courseClassesHeldData[courseDataIndex]) {
          coursesAttendanceData.push({
            course: courseClassesHeldData[courseDataIndex]!.course,
            classesHeld: courseClassesHeldData[courseDataIndex]!.classesHeld,
            classesPresent: presentClassesCount,
          });
        }
        courseDataIndex++;
      });

      return coursesAttendanceData;
    });

    return {
      username,
      totalClassesHeld,
      totalClassesAttended,
      attendancePercentage,
      coursesData,
    };
  } catch (error) {
    console.log("Failed to extract attendance data");
    throw error;
  } finally {
    if (page) {
      await page.close();
    }
  }
};

export default fetchAttendanceData;
