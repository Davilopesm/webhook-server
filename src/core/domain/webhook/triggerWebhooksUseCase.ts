import LocalStore from "../../../infrastructure/localStore";
import httpClient from "../../../infrastructure/httpClient";
import WebhookError from "./entities/webhookError";

export class TriggerWebhooksUseCase {
  constructor(private readonly store = LocalStore.getInstance()) { }

  async execute(payload: Record<string, any>): Promise<WebhookError[] | void> {
    const rejectedHttpCalls = new Array<WebhookError>();
    const existentWebhooks = this.store.getWebhooks();
    if(!existentWebhooks.length) {
      throw new WebhookError({ message: "Request received but no webhook found to trigger", statusCode: 200 });
    }

    console.info("Starting http request for webhooks: ", JSON.stringify(existentWebhooks));
    await Promise.allSettled(existentWebhooks.map(async webhook => {
      try {
        await httpClient.post(webhook.url, { token: webhook.token, ...payload });
      } catch (error) {
        console.log(`Failed to trigger webhook with ${error.message}`);
        const rejectedCall = new WebhookError({ message: `Request failed with ${error?.response?.statusText}`, statusCode: error?.response?.status, webhook })
        rejectedHttpCalls.push(rejectedCall);
      }
    }));

    if (rejectedHttpCalls.length) {
      return rejectedHttpCalls;
    }
  }
}