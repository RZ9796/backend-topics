import { EachMessagePayload, Kafka } from "kafkajs";
import express, { Request, Response } from "express";
import { Producer } from "../kafka-broker/kafka.producer";
const app = express();
app.use(express.json());

const kafka = new Kafka({
  brokers: ["localhost:9092"],
  clientId: "payment-service",
});

const consumer = kafka.consumer({ groupId: "payment-group" });

app.use("/", async (req: Request, res: Response) => {
  consumer.connect();
  consumer.subscribe({ topics: ["execute_payment"], fromBeginning: true });
  consumer.run({
    eachMessage: async ({ message, topic }: EachMessagePayload) => {
      const messageValue = await message.value?.toString();
      console.log("messageValue", messageValue);

      if (messageValue) {
        let orderDetails = JSON.parse(messageValue);
        console.log("orderDetails", orderDetails);

        console.log(
          `Payment request is received for Customer: ${orderDetails?.Name}`
        );
      }
    },
  });
  try {
    Producer("payment_success", req.body);
    console.log("payment request success in payment service");
    consumer.disconnect();
    res.send({ status: "success" });
  } catch (error) {
    Producer("payment_failed", JSON.stringify({ status: "Payment_failed" }));
  } finally {
    consumer.disconnect();
  }
});

app.listen(4000, () => {
  console.log("payment server running on 4000");
});
