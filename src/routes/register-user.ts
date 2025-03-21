import { Request, Response, Router } from "express";
import { addUser } from "../database/queries/register-user";
import registerUserHandler from "../handlers/register-user-handler";
import tryLogin from "../lib/scraping/try-login";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { userId, username, password } = req.body;
    if (!userId || !password) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    console.log(
      `Trying to register: UserId: ${userId} username: ${username} password: ${password}`
    );
    const result = await registerUserHandler({ userId, username, password });
    res.status(201).json(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Internal server error", msg: `${err.message}` });
  }
});

export default router;
