const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost:5672", function (error0, connection) {
  if (error0) {
    throw error0;
  }
  console.log("ba khubi khoshi vasl shod");
  connection.createChannel((error1, ch) => {
    if (error1) {
      throw error1;
    }

    const queue = "salam_kardan";
    const msg = "salam. az tarafe ashkan";

    ch.assertQueue(queue, {
      durable: false,
    });

    setInterval(() => {
      ch.sendToQueue(queue, Buffer.from(msg));
      console.log("[*] message ersal shod");
    }, 5000);
  });
});
