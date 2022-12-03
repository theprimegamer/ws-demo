import dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import { sendUpdateMessage } from "./services/aws-service";

const app: Express = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/message", (req: Request, res: Response) => {
  const payload = req.query.content + "" || "foobar";
  console.log("recevied", payload);
  res.send("Got message " + payload);
  sendUpdateMessage(payload);
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
