import { Router, Request, Response } from "express";
import WebhookError from "../../core/domain/webhook/entities/webhookError";
import { WebhookController } from "./controller";
import { webhookCreateValidator, webhookTriggerValidator } from "./validator";
const router = Router();

router.post('/', webhookCreateValidator, async (req: Request, res: Response, next) => {
  try {
    await new WebhookController().createWebhook(req.body.url, req.body.token);
    res.sendStatus(201);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message
    });
  }
});

router.post('/test', webhookTriggerValidator, async (req: Request, res: Response, next) => {
  try {
    const response = await new WebhookController().triggerWebhooks(req.body);
    if(response) {
      res.status(207).json(response);
    }
    res.sendStatus(204);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message
    });
  }
});

export const Webhook = router;
