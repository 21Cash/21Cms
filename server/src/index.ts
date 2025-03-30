import "dotenv/config";
import puppeteer, { Browser } from "puppeteer";
import rootRoute from "./routes/root";
import express from "express";
import registerUserRoute from "./routes/register-user";
import triggerFullAttendanceUpdateOnAllRoute from "./routes/trigger-full-attendance-update-on-all";
import {
  chromeExecutablePath,
  frontendUrl,
  port as runPort,
  useHeadlessBrowser,
} from "./constants";
import cors from "cors";
import getUserDashboardDataRoute from "./routes/get-user-dashboard-data";
import { DebugRootMethod } from "./dev-cache/debug-root";

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
  app.use("/get-user-dashboard-data", getUserDashboardDataRoute);

  // Call Debug Methods
  DebugRootMethod();
};

init();

export { browser, app };
