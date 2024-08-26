import express, { Request, Response } from "express";
import { Kafka } from "kafkajs";
import { Payment_info } from "./mode/payment.model";
const app = express();
import producer from "../kafka-broker/kafka.producer";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// kafka code
const kafka = new Kafka({
  clientId: "payment_service",
  brokers: ["localhost:9092", "localhost:29092"],
});
const consumer = kafka.consumer({ groupId: "payment_group" });

app.use("/dopayment", async (req: Request, res: Response) => {
  await consumer.connect();
  await consumer.subscribe({
    topics: ["execute_payment"],
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      let orderDetails: Payment_info;

      const messageValue = await message.value?.toString();

      // await circuitbreaker.breaker.fire(messageValue)

      if (messageValue) {
        orderDetails = await JSON.parse(messageValue);
        console.log(
          `Payment request is received for Customer: ${orderDetails?.customerName}`
        );
      }

      try {
        const payment_details: Payment_info = req.body;
        const topic: string = "payment_success";
        producer.runProducer(topic, payment_details);
        console.log("payment request success in payment service");

        consumer.disconnect();
        res.send({ status: "success" });
      } catch (error) {
        const topic: string = "payment_failed";
        producer.runProducer(
          topic,
          JSON.stringify({ status: "Payment_failed" })
        );
      } finally {
        consumer.disconnect();
      }
    },
  });
});

app.listen(4000, () => {
  console.log(`Payment service started on port 4000`);
});
export default app;
