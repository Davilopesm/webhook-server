import { Webhook } from "src/core/domain/webhook/webhook";
import { CreateWebhookUseCase } from "../../core/domain/webhook/createWebhookUseCase"

export class WebhookController {

  constructor(private readonly createWebHookUseCase = new CreateWebhookUseCase()) { }

  async createWebhook(url: string, token: string): Promise<void> {
    try {
      return this.createWebHookUseCase.execute(url, token);
    } catch (error) {
      throw new Error(`Failed creating webhook with: ${error.message}`);
    }
  }

  async getWebhook(): Promise<Webhook[]> {
    try {
      return this.createWebHookUseCase.getWebhooks();
    } catch (error) {
      throw new Error(`Failed creating webhook with: ${error.message}`);
    }
  }
}