const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "mapsa-app",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({
  groupId: "test-group-2",
});

(async () => {
  await consumer.connect();
  await consumer.subscribe({  
    topic: "nestJS",
    fromBeginning: true,
  });

  await consumer.assign();

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      //   console.log("message: ", message);
      //   console.log("topic: ", topic);
      console.log("partition: ", partition);
      console.log({
        value: message.value.toString(),
      });
    },
  });
})();
