import * as express from "express";
import { Webhook } from "./application/webhook/routes";
import { Health } from "./application/health/routes";
const app = express()
const port = process.env.SERVER_PORT || 9876;

app.use(express.json());
app.use("/health", Health);
app.use("/webhooks", Webhook);

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});


export default app;