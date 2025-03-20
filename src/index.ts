import "dotenv/config";
import puppeteer, { Browser } from "puppeteer";
import rootRoute from "./routes/root";
import express from "express";
import { testRootMethod } from "./dev-cache/test";
import registerUserRoute from "./routes/register-user";

let browser: Browser;
let app = express();
app.use(express.json());

const init = async () => {
  const isHeadless = process.env.BROWSER_IS_HEADLESS === "true";
  browser = await puppeteer.launch({ headless: isHeadless });

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  // Routes
  app.use("/", rootRoute);
  app.use("/register-user", registerUserRoute);

  // Dev Test Methods
  testRootMethod();
};

init();

export { browser, app };
