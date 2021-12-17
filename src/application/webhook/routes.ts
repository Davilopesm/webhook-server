import { Router, Request, Response } from "express";
import { WebhookController } from "./controller";
import { webhookValidator } from "./validator";
const router = Router();

router.post('/', webhookValidator, async (req: Request, res: Response, next) => {
  try {
    console.log(req.body);
    await new WebhookController().createWebhook(req.body.url, req.body.token);
    res.status(201).json({
      message: 'Webhook created successfully'
    });
  } catch (error) {
    res.status(500 || error.statusCode).json({
      error: "Internal Server Error",
      message: error.message
    });
  }
});

router.get('/test', async (req: Request, res: Response, next) => {
  try {
    const response = await new WebhookController().getWebhook();
    console.log("Finished get, returning: ", response);
    res.status(200).json(response);
  } catch (error) {
    res.status(500 || error.statusCode).json({
      error: "Internal Server Error",
      message: error.message
    });
  }
});

export const Webhook = router;
