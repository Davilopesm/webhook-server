import { Webhook } from "./webhook";
import LocalStore from "../../../infrastructure/localStore";

export class CreateWebhookUseCase {
  constructor(private readonly store = LocalStore.getInstance()) {}

  async execute(url: string, token: string): Promise<void> {
    const webhookToCreate = new Webhook(url, token);

    return this.store.storeWebhook(webhookToCreate);
  }

  async getWebhooks(): Promise<Webhook[]> {
    return this.store.getWebhooks();
  }
}