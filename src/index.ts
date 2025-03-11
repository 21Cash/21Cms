import "dotenv/config";
import puppeteer, { Browser } from "puppeteer";
import { experimentalCode1 } from "./Experimental/experiment";

let browser: Browser;

const init = async () => {
  browser = await puppeteer.launch({ headless: false });

  await experimentalCode1();
};

init();

export { browser };
