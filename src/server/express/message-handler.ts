import { RequestHandler } from "express";
import { sendUpdateMessage } from "../services/aws-service";
import { addMessage } from "../services/mongo-service";

type Response = {
  isSuccess: boolean;
};

type RequestBody = {
  messageType: number;
  message: string;
};

const messageHandler: RequestHandler<{}, Response, RequestBody> = async (
  req,
  res
) => {
  const payload = req.body;

  console.log(payload);
  if (!payload) {
    return res.sendStatus(400);
  }

  const sqsResponse = await sendUpdateMessage(payload);

  if (sqsResponse.MessageId) {
    await addMessage(sqsResponse.MessageId);
  } else {
    console.error("unexpected response!");
    return res.status(500).send({ isSuccess: false });
  }

  return res.send({ isSuccess: true });
};

export default messageHandler;
