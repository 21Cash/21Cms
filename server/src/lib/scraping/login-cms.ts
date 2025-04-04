import { Page } from "puppeteer";
import { browser } from "../..";
import { cmsUrl } from "../../constants";

const loginIntoCMS = async (
  username: string,
  password: string
): Promise<Page | null> => {
  if (!browser) {
    console.log(`Browser is not initialized`);
    return null;
  }

  const page = await browser.newPage();

  await page.goto(cmsUrl, { waitUntil: "domcontentloaded" });

  await page.evaluate(
    (user, pass) => {
      (document.querySelector("#txt_login") as HTMLInputElement).value = user;
      (document.querySelector("#txt_pswd") as HTMLInputElement).value = pass;
      (document.querySelector("#btnsubmit") as HTMLButtonElement)?.click();
    },
    username,
    password
  );

  try {
    await page.waitForSelector("#tr1My", { timeout: 5000 });
    return page;
  } catch (error) {
    console.log("Login failed or timed out");
    return null;
  }
};

export default loginIntoCMS;
