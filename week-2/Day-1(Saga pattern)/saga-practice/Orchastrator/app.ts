import { Kafka, EachMessagePayload } from "kafkajs";
import { Producer } from "../kafka-broker/kafka.producer";

const kafka = new Kafka({
  brokers: ["localhost:9092"],
  clientId: "orchastrator-service",
});

const consumer = kafka.consumer({ groupId: "Orchastrator_group" });

export const init = async () => {
  try {
    await consumer.connect();
    await consumer.subscribe({
      topics: ["order_requested", "payment_success", "payment_failed"],
      fromBeginning: true,
    });
    await consumer.run({
      eachMessage: async ({ topic, message }: EachMessagePayload) => {
        console.log(topic, " in orchastrator");
        if (topic === "order_requested") {
          console.log("order in orchastrator");

          const messageValue = await message.value?.toString();
          if (messageValue) {
            let orderDetails = JSON.parse(messageValue);
            console.log(
              `Order has been received to orchestrator customer name: ${orderDetails.Name}`
            );
          }

          //   produce for the execute payment
          Producer("execute_payment", messageValue);
        }
        if (topic === "payment_success") {
          const messageValue = await message.value?.toString();
          if (messageValue) {
            let orderDetails = JSON.parse(messageValue);
            console.log(
              `Payment success for customer: ${orderDetails.Name}`
            );
          }

          //   produce for the execute payment
          await Producer("user_payment_success", messageValue);
        }
      },
    });
  } catch (error) {}
};

init();
