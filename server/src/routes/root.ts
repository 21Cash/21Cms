import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hi from server, dont forget to smile :) and drink water! ");
});

export default router;
