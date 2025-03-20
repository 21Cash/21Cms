import { Page } from "puppeteer";
import { browser } from "../..";
import { cmsUrl } from "../../constants";

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
  if (!browser) {
    console.log(`Browser is not initialized`);
    return;
  }

  const page = await browser.newPage();

  await page.goto(cmsUrl, { waitUntil: "networkidle2" });

  await page.type("#txt_login", userId);
  await page.type("#txt_pswd", password);
  await page.click("#btnsubmit");

  try {
    await page.waitForSelector("#tr1My", { timeout: 5000 });
    const username = await page.$eval("#lblreportdate", (el) =>
      (el as HTMLElement).innerText.trim()
    );
    return { userId, password, username };
  } catch (error) {
    console.log("Login failed or timed out");
    return null;
  }
};

export default tryLogin;
