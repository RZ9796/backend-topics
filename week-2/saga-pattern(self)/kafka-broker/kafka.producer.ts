import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-producer",
  brokers: ["localhost:29092", "localhost:9092"],
});

const producer = kafka.producer();

const runProducer = async (topic: string, data: any) => {
  console.log("producer stated");
  await producer.connect();
  await producer.send({
    topic,
    messages: [{ value: JSON.stringify(data) }],
  });
  await producer.disconnect();
};

export default { runProducer };
