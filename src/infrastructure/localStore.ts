import { Webhook } from "../core/domain/webhook/webhook";

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
    if(this.storedItems.includes(webhook)) return;
    console.log("Storing new webhook: ", webhook);
    this.storedItems.push(webhook);
  }

  getWebhooks(): Webhook[] {
    console.log("Getting webhook: ", JSON.stringify(this.storedItems));
    return this.storedItems;
  }

}