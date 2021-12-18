import LocalStore from "../../../../src/infrastructure/localStore";
import { CreateWebhookUseCase } from "../../../../src/core/domain/webhook/createWebhookUseCase";
import { Webhook } from "../../../../src/core/domain/webhook/entities/webhook";

describe("CreateWebhookUseCase", () => {
  describe("execute", () => {
    it("Correctly calls store to create new webhook from given parameters", async () => {
      const store = new LocalStore();
      store.storeWebhook = jest.fn();
      const useCase = new CreateWebhookUseCase(store);
      const webhook = new Webhook("test.webhook.com/url", "token123-Au");

      await useCase.execute(webhook.url, webhook.token);
      expect(store.storeWebhook).toHaveBeenCalledTimes(1);
      expect(store.storeWebhook).toHaveBeenCalledWith(webhook);
    })
  });
})