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

  return {
    name,
    totalClassesHeld,
    totalClassesAttended,
    attendancePercentage,
    absentOn,
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
