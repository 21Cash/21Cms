import puppeteer from "puppeteer";
const cmsUrl = process.env.CMS_URL as string;
const adminSecretKey = process.env.ADMIN_SECRET_KEY;
const useHeadlessBrowser = process.env.USE_HEADLESS_BROWSER === "true";
const port = process.env.PORT;
const databaseURL = process.env.DATABASE_URL;
const chromeExecutablePath = process.env.CHROME_EXECUTABLE_PATH;
export {
  cmsUrl,
  adminSecretKey,
  useHeadlessBrowser,
  port,
  databaseURL,
  chromeExecutablePath,
};
