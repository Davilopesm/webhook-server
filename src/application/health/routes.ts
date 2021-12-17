import { Router, Request, Response } from "express";
const router = Router();

router.post('/', (req: Request, res: Response, next) => {
  res.status(200).json({
    message: 'Healthy'
  });
});

export const Health = router;
