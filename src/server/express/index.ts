import express, { Express } from "express";
import cors from "cors";
import messageHandler from "./message-handler";

export const configureExpress = () => {
  const app: Express = express();
  const port = process.env.EXPRESS_PORT;

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded());

  app.post("/message", messageHandler);

  app.listen(port, () => {
    console.log(
      `⚡️[server]: Express Server is running at http://localhost:${port}`
    );
  });
};
