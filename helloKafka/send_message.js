const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "mapsa-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
(async () => {
  try {
    await producer.connect();
    await producer.send({
      topic: "nodeJS",
      messages: [{ key: "salam", value: "Hello KafkaJS user!", partition: 1 }],
    });

    await producer.disconnect();
  } catch (error) {
    console.log("ERROR: ", error);
  }
})();
