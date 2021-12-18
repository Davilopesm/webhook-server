export default class WebhookError extends Error {
  statusCode: number;
  webhook: { url: string, token: string };
  
  constructor(error: { message: string, statusCode: number, webhook?: { url: string, token: string } }) {
    super();
    this.message = error.message;
    this.statusCode = error.statusCode || 500;
    this.webhook = error.webhook;
  }
}