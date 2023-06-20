const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const consumer = kafka.consumer({ groupId: "test-group-1" });

(async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "mapsa-camp", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log("message: ", message);
      console.log({
        value: message.value.toString(),
      });
      await delay(5000);
    },
  });
})();
