import { Webhook } from "../core/domain/webhook/entities/webhook";

export default class LocalStore {
  private static instance: LocalStore;
  private readonly storedItems: Webhook[] = [];

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new LocalStore();
    return this.instance;
  }

  storeWebhook(webhook: Webhook): void {
    if(this.alreadyExists(webhook)) {
      return;
    }
    console.log("Storing new webhook: ", webhook);
    this.storedItems.push(webhook);
  }

  getWebhooks(): Webhook[] {
    return this.storedItems;
  }

  private alreadyExists(webhook: Webhook): Webhook {
    return this.storedItems.find(element => (element.token === webhook.token && element.url === webhook.url));
  }

}