import { Request, Response, Router } from "express";
import { getUserDashboardDataHandler } from "../handlers/get-user-dashboard-data-handler";
import { getCoursesDataOnDateHandler } from "../handlers/get-courses-data-on-date-handler";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    const dateString = req.query.dateString as string;

    if (!userId || !dateString) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    const result = await getCoursesDataOnDateHandler({
      userId,
      dateString,
    });
    res.status(201).json(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", msg: `${err.message}` });
  }
});

export default router;
