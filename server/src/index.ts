import "dotenv/config";
import puppeteer, { Browser } from "puppeteer";
import rootRoute from "./routes/root";
import express from "express";
import registerUserRoute from "./routes/register-user";
import triggerFullAttendanceUpdateOnAllRoute from "./routes/trigger-full-attendance-update-on-all";
import triggerFullAttendanceUpdateOnUserRoute from "./routes/trigger-full-attendance-update-on-user";
import {
  chromeExecutablePath,
  frontendUrl,
  port as runPort,
  useHeadlessBrowser,
} from "./constants";
import cors from "cors";
import getUserDashboardDataRoute from "./routes/get-user-dashboard-data";
import getCoursesDataOnDateRoute from "./routes/get-courses-data-on-date";
import getUserDataRoute from "./routes/get-user-data";

let browser: Browser;
let app = express();
app.use(express.json());

const init = async () => {
  const isHeadless = useHeadlessBrowser;
  browser = await puppeteer.launch({
    headless: isHeadless,
    executablePath: chromeExecutablePath,
  });

  app.use(
    cors({
      origin: frontendUrl,
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );

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
  app.use(
    "/trigger-full-attendance-update-on-user",
    triggerFullAttendanceUpdateOnUserRoute
  );
  app.use("/get-user-dashboard-data", getUserDashboardDataRoute);
  app.use("/get-user-courses-data-on-date", getCoursesDataOnDateRoute);
  app.use("/get-user-data", getUserDataRoute);
};

init();

export { browser, app };
