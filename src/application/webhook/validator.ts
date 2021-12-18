import { Response, Request, NextFunction } from "express";
import * as Joi from "joi";

export const webhookCreateValidator = async (req: Request, res: Response, next: NextFunction) => {
  const WebhookSchema = Joi.object({
    url: Joi.string().required(),
    token: Joi.string().required()
  });

  try {
    await WebhookSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({
      status: 400,
      result: err.details[0].message
    });
  }
  next();
}

export const webhookTriggerValidator = async (req: Request, res: Response, next: NextFunction) => {
  const WebhookTriggerSchema = Joi.object({
    payload: Joi.required()
  });

  try {
    await WebhookTriggerSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({
      status: 400,
      result: err.details[0].message
    });
  }
  next();
}