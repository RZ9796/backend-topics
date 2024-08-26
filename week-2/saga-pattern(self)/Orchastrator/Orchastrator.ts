import { Kafka, EachMessagePayload } from "kafkajs";
import producer from "../kafka-broker/kafka.producer";
const kafka = new Kafka({
  clientId: "Orchestrator-service",
  brokers: ["localhost:9092", "localhost:29092"],
});

const consumer = kafka.consumer({ groupId: "Orchestrator-group" });

export const init = async () => {
  try {
    console.log("Consumer connection stated");
    await consumer.connect();
    await consumer.subscribe({
      topics: ["order_requested", "payment_success", "payment_failed"],
      fromBeginning: true,
    });
    
    await consumer.run({
      eachMessage: async ({ topic, message }: EachMessagePayload) => {
        console.log(" before order_requested");
        if (topic == "order_requested") {
         // const data = await message.value
          console.log("order_requested");

          const messageValue = await message.value?.toString();
          if (messageValue) {
            let orderDetails = JSON.parse(messageValue);
            console.log(
              `Order has been received to orchestrator customer name: ${orderDetails.customerName}`
            );
          }

          const topic: string = "execute_payment";
          producer.runProducer(topic, messageValue);
        }

        if (topic == "payment_success") {
          const messageValue = await message.value?.toString();
          if (messageValue) {
            let paymentDetails = JSON.parse(messageValue);
            console.log(
              `Payment success for customer: ${paymentDetails.customerName}`
            );
          }

          const topic: string = "user_payment_success";
          producer.runProducer(topic, messageValue);
        }

        if (topic == "Payment_failed") {
          const topic: string = "user_payment_failed";
          producer.runProducer(topic, JSON.stringify({ status: "Failed!!!!" }));
        }
      },
    });
  } catch (error) {
    console.error("Error in consumer:", error);
  }
};

init();
