import { TriggerWebhooksUseCase } from "../../core/domain/webhook/triggerWebhooksUseCase";
import { CreateWebhookUseCase } from "../../core/domain/webhook/createWebhookUseCase"
import WebhookError from "../../core/domain/webhook/entities/webhookError";

export class WebhookController {

  constructor(
    private readonly createWebHookUseCase = new CreateWebhookUseCase(),
    private readonly triggerWebhooksUsecase = new TriggerWebhooksUseCase()
  ) { }

  async createWebhook(url: string, token: string): Promise<void> {
    try {
      return this.createWebHookUseCase.execute(url, token);
    } catch (error) {
      throw new Error(`Failed creating webhook with: ${error.message}`);
    }
  }

  async triggerWebhooks(payload: Record<string, any>): Promise<WebhookError[] | void> {
    try {
      return this.triggerWebhooksUsecase.execute(payload);
    } catch (error) {
      throw new Error(`Failed creating webhook with: ${error.message}`);
    }
  }
}