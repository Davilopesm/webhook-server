import { Webhook } from "./webhook";
import LocalStore from "../../../infrastructure/localStore";

export class GetWebhookUseCase {
  constructor(private readonly store = LocalStore.getInstance()) {}

  async execute(): Promise<Webhook[]> {
    return this.store.getWebhooks();
  }
}