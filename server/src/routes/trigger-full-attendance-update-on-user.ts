import { Request, Response, Router } from "express";
import registerUserHandler from "../handlers/register-user-handler";
import { triggerFullInfoUpdateOnAll } from "../actions/trigger-full-info-update-on-all";
import { triggerFullAttendanceUpdateAllHandler } from "../handlers/trigger-full-attendance-update-all-handler";
import { triggerFullAttendanceUpdateOnUserHandler } from "../handlers/trigger-full-attendance-update-on-user-handler";
import { error } from "console";
import { adminSecretKey } from "../constants";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const secretKey = req.query.secretKey as string;
    const userId = req.query.userId as string;
    if (!adminSecretKey) {
      throw new Error("No Admin Secret Key Defined in .env file");
      return;
    }

    if (secretKey !== adminSecretKey) {
      throw new Error("UnAuthorized, Secret key is incorrect.");
      return;
    }

    if (!userId) {
      res.status(400).json({
        error: "Bad Request 400",
        msg: `User with userId: ${userId} doesn't exist.`,
      });
      return;
    }

    triggerFullAttendanceUpdateOnUserHandler({ userId });
    res.status(200).json({
      msg: `Action triggered for full attendance Update on user ${userId}`,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", msg: `${err.message}` });
  }
});

export default router;
