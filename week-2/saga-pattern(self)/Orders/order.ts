import express, { Request, Response } from "express";
import { Kafka } from "kafkajs";
import producer from "../kafka-broker/kafka.producer";
import { Order_Info } from "./model/orders.model";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const kafka = new Kafka({
  clientId: "order_producer",
  brokers: ["localhost:9092", "localhost:29092"],
});
const consumer = kafka.consumer({ groupId: "order-group" });

app.use("/createorder", async (req: Request, res: Response) => {
  console.log(req.body);

  const order_details: Order_Info = req.body;
  const topic: string = "order_requested";
  try {
    // producer
    await producer.runProducer(topic, order_details);

    // consumer
    await consumer.connect();
    console.log("connected");

    await consumer.subscribe({
      topics: ["user_payment_success", "user_payment_failed"],
    });

    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        console.log("topic ", topic);

        if (topic == "user_payment_success") {
          const payment_info = message.value?.toString();

          if (payment_info) {
            const payment_details = JSON.parse(payment_info);
            const data = JSON.parse(payment_details);

            consumer.disconnect();
            res.status(200).json({
              message: "Order Placed Successfully",
              payment_info: data,
            });
          }
        }

        if (topic == "user_payment_failed") {
        }
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to place order" });
  } finally {
    // console.log("didconnected order consumer");
    consumer.disconnect();
  }
});

//   console.log("Producing order request");
//   await producer.runProducer("order_requested", req.body);
//   console.log("Produced order request");

//   console.log("consumer connecting");
//   await consumer.connect();
//   console.log("consumer connected");
//   await consumer.subscribe({
//     topics: ["user_payment_success", "user_payment_failed"],
//   });
//   await consumer.run({
//     eachMessage: async ({ message, topic }) => {
//       console.log("topic", topic);
//       let data: any;
//       if (topic === "user_payment_success") {
//         console.log("+++++++++++");
//         console.log("payment success");
//         console.log("+++++++++++");

//         // data = JSON.parse(message.value?.toString()!);
//         await consumer.disconnect();
//         console.log("disconnected");
//         res.status(200).json({ message: "order and payment success" });
//       }
//       if (topic === "user_payment_failed") {
//         // data = JSON.parse(message.value?.toString()!);
//         console.log("topic", topic);
//         res.status(400).json({ message: "order and payment failed" });
//         await consumer.disconnect();
//       }
//     },
//   });
// });
app.listen(3000, () => {
  console.log(`order service started on port 3000`);
});
export default app;
