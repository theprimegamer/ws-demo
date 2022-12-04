import { MongoClient } from "mongodb";

const mongoUri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@localhost:${process.env.MONGO_PORT}/?authMechanism=DEFAULT`;

export const addMessage = async (messageId: string) => {
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const insertResult = await client
      .db("ws-demo")
      .collection("messages")
      .insertOne({ messageId });
    console.log("mongo result", insertResult);
  } finally {
    await client.close();
  }
};
