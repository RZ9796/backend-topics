import express, { Request, Response } from "express";
import mongoose from "mongoose";
import { Kafka } from "kafkajs";
import EventEmitter from "events";

mongoose.connect("mongodb://localhost:27017/kafka");
//
const kafka = new Kafka({ clientId: "123", brokers: ["localhost:29092"] });
const consumer = kafka.consumer({ groupId: "1234" });
const producer = kafka.producer();
//
const eventEmitter = new EventEmitter();
(async () => {
  try {
    await consumer.connect();
    await producer.connect();
    //
    await consumer.subscribe({ topic: "usertodo", fromBeginning: false });
    await consumer.run({
      eachMessage: async ({ message }) => {
        console.log(message.value);
        const user = JSON.parse(message.value?.toString()!);
        eventEmitter.emit("user", user);
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

const todo = mongoose.model(
  "todo",
  new mongoose.Schema({
    title: { type: String },
    userId: { type: mongoose.Types.ObjectId },
  })
);

app.post("/:name", async (req: Request, res: Response) => {
  await producer.connect();

  await producer.send({
    topic: "username",
    messages: [{ value: req.params.name }],
  });
  // await producer.disconnect();
  eventEmitter.once("user", async (data) => {
    console.log(data);

    const rss = await todo.create({ ...req.body, userId: data._id });
    res.status(200).json({ message: "todo created successfully", data: rss });
  });
});

mongoose.connection.once("open", () => {
  app.listen(4000, () => console.log("server connected 4000"));
});
