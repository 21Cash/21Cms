import { Page } from "puppeteer";
import { browser } from "../..";
import { cmsUrl } from "../../constants";

const loginIntoCMS = async (
  username: string,
  password: string
): Promise<Page | null> => {
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

export default loginIntoCMS;
