import { Page } from "puppeteer";
import { cmsUrl } from "../../constants";
import loginIntoCMS from "./login-cms";

interface AttendanceData {
  username: string;
  totalClassesHeld: number;
  totalClassesAttended: number;
  attendancePercentage: number;
  absentClasses: {
    startTime: Date;
    endTime: Date;
    classesCount: number;
    courseCode: string;
  }[];
  coursesData: {
    course: string;
    classesHeld: number;
    classesPresent: number;
  }[];
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
    const absentOn = await page.$$eval("#lblabsenton", (els) =>
      els
        .map((el) => el.innerHTML.trim())
        .join("")
        .split("<br>")
    );
    const absentClasses = absentOn
      .map((item) => {
        const regex =
          /^([^()]+)\(([\d:]+\s?[AP]M)-([\d:]+\s?[AP]M) on (\d{2}\/\d{2}\/\d{4})\)$/;
        const match = item.match(regex);
        if (match) {
          const course = match[1].trim();
          const startTimeStr = match[2].trim();
          const endTimeStr = match[3].trim();
          const dateStr = match[4].trim();
          const [day, month, year] = dateStr.split("/");
          const convertedDate = `${month}/${day}/${year}`;
          const startTime = new Date(`${convertedDate} ${startTimeStr}`);
          const endTime = new Date(`${convertedDate} ${endTimeStr}`);
          const diff = (endTime.getTime() - startTime.getTime()) / 60000;
          const classesCount = diff / 50;
          return {
            startTime,
            endTime,
            classesCount,
            courseCode: course,
          };
        }
        return null;
      })
      .filter((item) => item !== null) as {
      startTime: Date;
      endTime: Date;
      classesCount: number;
      courseCode: string;
    }[];
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
    const coursesDataWithDuplicates = await page.evaluate(() => {
      const items: { course: string; classesHeld: number }[] = [];
      const liElements = document.querySelectorAll(".visualize-labels-x li");
      liElements.forEach((li) => {
        const labelSpan = li.querySelector(".label");
        if (labelSpan && labelSpan.textContent) {
          const text = labelSpan.textContent.trim();
          const regex = /^([A-Za-z0-9_]+)\((\d+)\)$/;
          const match = text.match(regex);
          if (match) {
            items.push({
              course: match[1],
              classesHeld: parseInt(match[2], 10),
            });
          }
        }
      });
      return items;
    });
    const dedupedCoursesData = Array.from(
      new Map(
        coursesDataWithDuplicates.map((item) => [item.course, item])
      ).values()
    );
    const coursesData = dedupedCoursesData.map((courseItem) => {
      const totalAbsent = absentClasses.reduce((acc, absentItem) => {
        return absentItem.courseCode === courseItem.course
          ? acc + absentItem.classesCount
          : acc;
      }, 0);
      return {
        ...courseItem,
        classesPresent: courseItem.classesHeld - totalAbsent,
      };
    });
    return {
      username: name,
      totalClassesHeld,
      totalClassesAttended,
      attendancePercentage,
      absentClasses,
      coursesData,
    };
  } catch (error) {
    console.log("Failed to extract attendance data");
    throw error;
  }
};

export default fetchAttendanceData;
