import { CreateWebhookUseCase } from "../../../src/core/domain/webhook/createWebhookUseCase";
import { WebhookController } from "../../../src/application/webhook/controller";

describe("Controller", () => {
  const webhook = {
    url: "test.webhook.com/url",
    token: "token123-Au"
  }
  describe("createWebhook", () => {
    it("Correctly calls store to create new webhooks from given parameters", async () => {
      const useCase = new CreateWebhookUseCase(null);
      useCase.execute = jest.fn();

      new WebhookController(useCase).createWebhook(webhook.url, webhook.token);
      expect(useCase.execute).toHaveBeenCalledTimes(1);
      expect(useCase.execute).toHaveBeenCalledWith(webhook.url, webhook.token);
    })

    it("Throws if use case fails to create webhook", async () => {
      const useCase = new CreateWebhookUseCase(null);
      useCase.execute = jest.fn().mockRejectedValueOnce(new Error());

      const controller = new WebhookController(useCase);
      await expect(controller.createWebhook(webhook.url, webhook.token)).rejects.toThrow()
    })
  });
})