import { Request, Response, Router } from "express";
import registerUserHandler from "../handlers/register-user-handler";
import { triggerFullInfoUpdateOnAll } from "../actions/trigger-full-info-update-on-all";
import { triggerFullAttendanceUpdateAllHandler } from "../handlers/trigger-full-attendance-update-all-handler";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const secretKey = req.query.secretKey as string;
    await triggerFullAttendanceUpdateAllHandler({ secretKey });
    res.status(300).json({
      msg: "Action triggered for full attendance Update on all users",
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", msg: `${err.message}` });
  }
});

export default router;
