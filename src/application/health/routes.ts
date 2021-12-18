import { Router, Request, Response } from "express";
const router = Router();

router.post('/ping', (req: Request, res: Response, next) => {
  res.status(200).json({
    message: 'Pong'
  });
});

export const Health = router;
