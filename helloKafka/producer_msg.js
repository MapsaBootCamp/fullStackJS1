const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
(async () => {
  try {
    await producer.connect();
    await producer.send({
      topic: "mapsa-camp",
      messages: [{ value: "Hello KafkaJS user!" }],
    });

    await producer.disconnect();
  } catch (error) {
    console.log("ERROR: ", error);
  }
})();
