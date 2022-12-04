import { randomUUID } from "crypto";
import { Server as WebSocketServer } from "ws";

export const configureWebsockets = () => {
  const port = process.env.WS_PORT ? +process.env.WS_PORT : 7071;
  const wss = new WebSocketServer({ port });

  const clients = new Map();

  wss.on("connection", function connection(ws) {
    const uuid = randomUUID();
    clients.set(uuid, ws);

    ws.on("message", function message(data) {
      console.log("received: %s", data);

      for (const client of wss.clients) {
        if (client !== ws) {
          client.send(data);
        }
      }
    });

    ws.send("Connected with id " + uuid);
  });

  console.log(`⚡️[server]: WS Server is running at http://localhost:${port}`);
};
