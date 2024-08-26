import express, { Request, Response } from "express";
import { EachMessagePayload, Kafka } from "kafkajs";
import { Producer } from "../kafka-broker/kafka.producer";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const kafka = new Kafka({
  brokers: ["localhost:9092"],
  clientId: "order_product",
});
const consumer = kafka.consumer({ groupId: "order-group" });

app.use("/", async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    await Producer("order_requested", req.body).then(async () => {
      await consumer.connect();
      console.log("connected");

      await consumer.subscribe({
        topics: ["user_payment_success", "user_payment_failure"],
        fromBeginning: true,
      });

      console.log("subscribed");

      await consumer.run({
        eachMessage: async ({
          topic,
          partition,
          message,
        }: EachMessagePayload) => {
          console.log("++++++++++++++");
          console.log(topic, message);
          console.log("++++++++++++++");

          if (topic == "user_payment_success") {
            const payment_info = message.value?.toString();
            if (payment_info) {
              const payment_details = JSON.parse(payment_info);
              console.log("payment_details", payment_details);

              const data = JSON.parse(payment_details);
              console.log("data", data);

              await consumer.disconnect();
              console.log("disconnected")
              
              res.status(200).json({
                message: "Order Placed Successfully",
                data,
              });
            }
          }
        },
      });
    });
    // consumer
  } catch (error) {
    res.status(500).json({ message: "Failed to place order" });
  } finally {
    await consumer.disconnect();
  }
});
app.listen(3000, () => {
  console.log(" ORDER server is running at 3000");
});
