import { cmsUrl, testPassword, testUsername } from "../constants";
import { browser } from "..";
import { resourceUsage } from "process";
import puppeteer, { Page } from "puppeteer";

const loginIntoCMS = async (username: string, password: string) => {
  console.log(
    `Trying to log in with username: ${username} and password: ${password} on cmsUrl: ${cmsUrl}`
  );
  if (!browser) {
    console.log(`Browser is not initialized`);
    return;
  }

  const page = await browser.newPage();

  await page.goto(cmsUrl, { waitUntil: "networkidle2" });

  await page.type("#txt_login", username);
  await page.type("#txt_pswd", password);
  await page.click("#btnsubmit");

  try {
    await page.waitForSelector("#tr1My", { timeout: 5000 });
    return page;
  } catch (error) {
    console.log("Login failed or timed out");
    return null;
  }
};

const gotoAttendancePage = async (page: Page) => {
  await page.goto(`${cmsUrl}/AttendanceRegister/`);
  try {
    await page.waitForSelector("#lblgenarate", { timeout: 5000 });
    return page;
  } catch (error) {
    console.log("Attendance page not found or timed out");
    return null;
  }
};

type AttendanceData = {
  name: string;
  totalClassesHeld: number;
  totalClassesAttended: number;
  attendancePercentage: number;
  absentOn: string[];
  coursesData: { course: string; classesHeld: number }[];
};

const getAttendanceData = async (page: Page): Promise<AttendanceData> => {
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

  console.log("Extracting graph iframe URL...");

  const iframeUrl = await page.$eval("#iframe_atten_report", (el) =>
    (el as HTMLIFrameElement).getAttribute("src")
  );

  if (!iframeUrl) {
    throw new Error("Graph iframe URL not found.");
  }

  const baseUrl = page.url();
  const graphUrl = new URL(iframeUrl, baseUrl).toString();

  console.log(`Navigating to graph URL: ${graphUrl}`);

  await page.goto(graphUrl, { waitUntil: "networkidle2" });

  await page.waitForSelector(".visualize-labels-x li");

  console.log("Graph container loaded. Extracting graph data...");

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

  const coursesData = Array.from(
    new Map(
      coursesDataWithDuplicates.map((item) => [item.course, item])
    ).values()
  );

  return {
    name,
    totalClassesHeld,
    totalClassesAttended,
    attendancePercentage,
    absentOn,
    coursesData,
  };
};

const experimentalCode1 = async () => {
  const loginPage = await loginIntoCMS(testUsername, testPassword);
  const attendancePage = await gotoAttendancePage(loginPage);
  console.log(`On Attendance Page`);
  const attendanceData = await getAttendanceData(attendancePage);
  console.log(attendanceData);
};

export { experimentalCode1 };
