import LocalStore from "../../../../src/infrastructure/localStore";
import { TriggerWebhooksUseCase } from "../../../../src/core/domain/webhook/triggerWebhooksUseCase";
import { Webhook } from "../../../../src/core/domain/webhook/entities/webhook";
import WebhookError from "../../../../src/core/domain/webhook/entities/webhookError";
import httpClient from "../../../../src/infrastructure/httpClient";
jest.mock("../../../../src/infrastructure/httpClient");

describe("TriggerWebhookUseCase", () => {
  const requestPayload = {
    "payload": [{ "test": "new" }]
  };
  const webhooks = [new Webhook("test.webhook.com/url", "token123-Au"), new Webhook("test.webhook.com/url", "token456-Au")];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("execute", () => {
    it("Calls store to get webhooks and throw no webhook error", async () => {
      const store = new LocalStore();
      store.getWebhooks = jest.fn().mockImplementationOnce(() => []);
      const useCase = new TriggerWebhooksUseCase(store);

      await expect(useCase.execute(requestPayload)).rejects.toThrow("Request received but no webhook found to trigger");
      expect(store.getWebhooks).toHaveBeenCalledTimes(1);
    })

    it("Calls http client once for each webhook with correct url, token and payload", async () => {
      const store = new LocalStore();
      store.getWebhooks = jest.fn().mockImplementationOnce(() => webhooks);
      const useCase = new TriggerWebhooksUseCase(store);
      const response = await useCase.execute(requestPayload);

      expect(store.getWebhooks).toHaveBeenCalledTimes(1);
      expect(httpClient.post).toHaveBeenCalledTimes(2);
      expect(httpClient.post).toHaveBeenNthCalledWith(1, webhooks[0].url, { token: webhooks[0].token, ...requestPayload });
      expect(httpClient.post).toHaveBeenNthCalledWith(2, webhooks[1].url, { token: webhooks[1].token, ...requestPayload });
      expect(response).toBe(undefined);
    })

    it("Calls http client for each webhook and returns errors only for requests that failed", async () => {
      const store = new LocalStore();

      httpClient.post = jest.fn().mockRejectedValueOnce(new Error());
      store.getWebhooks = jest.fn().mockImplementationOnce(() => webhooks);

      const useCase = new TriggerWebhooksUseCase(store);
      const response = await useCase.execute(requestPayload);

      expect(httpClient.post).toHaveBeenCalledTimes(2);
      expect(response).toHaveLength(1);
      expect(response).toEqual([new WebhookError({ message: `Request failed with undefined`, statusCode: 500 })]);
    })
  });
})
