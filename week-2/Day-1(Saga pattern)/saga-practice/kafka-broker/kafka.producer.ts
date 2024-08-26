import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-producer",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

export const Producer = async (topic: string, data: any) => {
  console.log(topic, data);

  await producer.connect();
  await producer.send({ topic, messages: [{ value: JSON.stringify(data) }] });
  await producer.disconnect();
};
