import { Request, Response, Router } from "express";
import { getCoursesDataOnDateHandler } from "../handlers/get-courses-data-on-date-handler";
import { getLatestCoursesDataHandler } from "../handlers/get-latest-courses-data-handler";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;

    if (!userId) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }
    const result = await getLatestCoursesDataHandler({
      userId,
    });
    res.status(201).json(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", msg: `${err.message}` });
  }
});

export default router;
