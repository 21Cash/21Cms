import { Page } from "puppeteer";
import { browser } from "../..";
import { cmsUrl } from "../../constants";

const loginIntoCMS = async (
  username: string,
  password: string
): Promise<Page | null> => {
  if (!browser) {
    console.log("Browser is not initialized");
    return null;
  }

  const page = await browser.newPage();

  try {
    await page.goto(cmsUrl, { waitUntil: "networkidle2" });
    await page.type("#txt_login", username);
    await page.type("#txt_pswd", password);
    await page.click("#btnsubmit");

    await page.waitForSelector("#tr1My", { timeout: 5000 });
    return page;
  } catch (error) {
    console.error("Login failed or encountered an error:", error);
    await page.close();
    return null;
  }
};

export default loginIntoCMS;
