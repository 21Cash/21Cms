import "dotenv/config";
import puppeteer, { Browser } from "puppeteer";
import rootRoute from "./routes/root";
import express from "express";
import { testMethod } from "./dev-cache/test";

let browser: Browser;
let app = express();

const init = async () => {
  browser = await puppeteer.launch({ headless: false });

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  // Routes
  app.use("/", rootRoute);

  // Dev Test Methods
  // testMethod();
};

init();

export { browser, app };
