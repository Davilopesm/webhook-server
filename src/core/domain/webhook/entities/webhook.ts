export class Webhook {
  url: string;
  token: string;

  constructor(url: string, token: string) {
    this.url = url;
    this.token = token;
  }
}