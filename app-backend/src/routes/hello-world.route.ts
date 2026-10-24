import { Router, type Response } from "express";

const router = Router();

router.get("/", (_: any, res: Response) => {
  res
    .json({
      message: "Hello world",
      status: "Ok",
    })
    .status(200);
});

export default router;
