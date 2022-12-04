import ws from "ws";

export const configureWebsockets = () => {
  const port = process.env.WS_PORT ? +process.env.WS_PORT : 7071;
  const wss = new ws.Server({ port });

  console.log("Started websocket on port ", port);
};
