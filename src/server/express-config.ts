import express, { Express, Request, Response } from "express";
import { sendUpdateMessage } from "./services/aws-service";
import { addMessage } from "./services/mongo-service";
export const configureExpress = () => {
  const app: Express = express();
  const port = process.env.EXPRESS_PORT;

  app.get("/", (req: Request, res: Response) => {
    res.send('Send a message at /message with the query string "content"');
  });

  app.get("/message", async (req: Request, res: Response) => {
    const payload = req.query.content + "" || "foobar";
    console.log("recevied", payload);
    res.send("Got message " + payload);
    const sqsResponse = await sendUpdateMessage(payload);
    console.log(sqsResponse);
    if (sqsResponse.MessageId) {
      await addMessage(sqsResponse.MessageId);
    } else {
      console.error("unexpected response!");
    }
  });

  app.listen(port, () => {
    console.log(
      `⚡️[server]: Express Server is running at http://localhost:${port}`
    );
  });
};
