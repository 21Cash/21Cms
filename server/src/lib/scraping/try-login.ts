import puppeteer from "puppeteer";
import {
  chromeExecutablePath,
  cmsUrl,
  useHeadlessBrowser,
} from "../../constants";

interface UserInfo {
  userId: string;
  username: string;
  password: string;
}

const tryLogin = async (
  userId: string,
  password: string
): Promise<UserInfo> => {
  console.log(
    `Trying to log in with userId: ${userId} and password: ${password} on cmsUrl: ${cmsUrl}`
  );

  // Launch a new browser instance so that it doesn't interfere with full info updates.
  const browserInstance = await puppeteer.launch({
    executablePath: chromeExecutablePath,
    headless: useHeadlessBrowser,
  });

  const page = await browserInstance.newPage();

  try {
    await page.goto(cmsUrl, { waitUntil: "networkidle2" });

    await page.type("#txt_login", userId);
    await page.type("#txt_pswd", password);
    await page.click("#btnsubmit");

    try {
      await page.waitForSelector("#lblname", { timeout: 3000 });
    } catch (err) {
      throw new Error(
        "Failed to login with given credentials. Recheck Credentails"
      );
    }

    const username = await page.$eval("#lblname", (el) =>
      (el as HTMLElement).innerText.trim()
    );

    if (!username) {
      throw new Error(
        "Failed to login with the given credentials, or page load timed out"
      );
    }

    return { userId, password, username };
  } finally {
    if (page) {
      await page.close();
    }
    if (browserInstance) {
      await browserInstance.close();
    }
  }
};

export default tryLogin;
