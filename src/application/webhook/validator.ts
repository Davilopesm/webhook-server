import { Response, Request, NextFunction } from "express";
import * as Joi from "joi";

const WebhookSchema = Joi.object({
  url: Joi.string().required(),
  token: Joi.string().required()
});

export const webhookValidator = async (req: Request, res: Response, next: NextFunction) => {
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