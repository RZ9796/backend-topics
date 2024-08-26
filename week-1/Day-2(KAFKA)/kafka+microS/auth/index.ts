import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Kafka } from "kafkajs";

mongoose.connect("mongodb://localhost:27017/kafka");

//
const kafka = new Kafka({ clientId: "1", brokers: ["localhost:29092"] });
const consumer = kafka.consumer({ groupId: "123" });
const producer = kafka.producer();
(async () => {
  try {
    await consumer.connect();
    await producer.connect();
    //

    // consumer for user
    await consumer.subscribe({ topic: "username", fromBeginning: false });
    await consumer.run({
      eachMessage: async ({ message }) => {
        const data = message.value?.toString();
        console.log(data);

        const result = await user.findOne({ name: data });
        //prodecer for todo
        await producer.send({
          messages: [{ value: JSON.stringify(result) }],
          topic: "usertodo",
        });
        // await producer.disconnect();
      },
    });

    // await consumer.disconnect();
  } catch (error) {
    console.log(error);
  }
})();
//
const app = express();
app.use(express.json());

// schema
const user = mongoose.model(
  "user",
  new mongoose.Schema({
    name: { type: String },
  })
);

app.post("/", async (req: Request, res: Response) => {
  await user.create(req.body);
  res.status(200).json({ message: "user created successfully" });
});

mongoose.connection.once("open", () => {
  app.listen(3000, () => console.log("server connected 4000"));
});
