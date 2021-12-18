import { Webhook } from "../../src/core/domain/webhook/entities/webhook";
import LocalStore from "../../src/infrastructure/localStore";

describe("LocalStore", () => {
  describe("getInstance", () => {
    it("Correctly returns a Local Store instance", async () => {
      const instance = LocalStore.getInstance();
      expect(instance).toBeInstanceOf(LocalStore);
    });
  });

  describe("storeWebhook", () => {
    const instance = LocalStore.getInstance();
    const webhook = new Webhook("test.webhook.com/url", "token123-Au");

    it("Adds and returns a webhook", async () => {
      const instance = LocalStore.getInstance();
      instance.storeWebhook(webhook);
      const savedHooks = instance.getWebhooks();
      expect(savedHooks[0].url).toEqual(webhook.url);
      expect(savedHooks[0].token).toEqual(webhook.token);
    });

    it("Adds one webhook and returns all saved webhooks", async () => {
      const newWebhook = new Webhook("test.webhook.com/uri", "token456-Au");
      instance.storeWebhook(newWebhook);
      const savedHooks = instance.getWebhooks();
      expect(savedHooks[0].url).toEqual(webhook.url);
      expect(savedHooks[0].token).toEqual(webhook.token);
      expect(savedHooks[1].url).toEqual(newWebhook.url);
      expect(savedHooks[1].token).toEqual(newWebhook.token);
    });

    it("Does not store an already existent webhook", async () => {
      instance.storeWebhook(webhook);
      const savedHooks = instance.getWebhooks();
      expect(savedHooks.length).toEqual(2);
    });
  });
})