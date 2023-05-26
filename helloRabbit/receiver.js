const amqp = require("amqplib");

(async () => {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    console.log("ba khubi khoshi vasl shod");
    const ch = await connection.createChannel();

    const queue = "salam_kardan";

    ch.assertQueue(queue, {
      durable: false,
    });

    ch.consume(queue, (msg) => {
      if (msg !== null) {
        console.log(`[*] message ${msg.content.toString()} daryaft shod`);
        ch.ack(msg);
      }
    });
  } catch (error) {
    throw new Error(error);
  }
})();
