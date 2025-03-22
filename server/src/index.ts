import "dotenv/config";
import puppeteer, { Browser } from "puppeteer";
import rootRoute from "./routes/root";
import express from "express";
import { testRootMethod } from "./dev-cache/test";
import registerUserRoute from "./routes/register-user";
import triggerFullAttendanceUpdateOnAllRoute from "./routes/trigger-full-attendance-update-on-all";
import { port as runPort, useHeadlessBrowser } from "./constants";

let browser: Browser;
let app = express();
app.use(express.json());

const init = async () => {
  const isHeadless = useHeadlessBrowser;
  browser = await puppeteer.launch({ headless: isHeadless });

  const port = runPort || 3000;

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  // Routes
  app.use("/", rootRoute);
  app.use("/register-user", registerUserRoute);
  app.use(
    "/trigger-full-attendance-update-on-all",
    triggerFullAttendanceUpdateOnAllRoute
  );
};

init();

export { browser, app };
