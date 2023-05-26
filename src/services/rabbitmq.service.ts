import * as amqp from 'amqplib';
const connect = (
  url = `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}`,
) => {
  return new Promise((resolve, reject) => {
    amqp
      .connect(url)
      .then(conn => resolve(conn))
      .catch(err => reject(err));
  });
};

const createChannel = conn => {
  return new Promise((resolve, reject) => {
    conn
      .createChannel()
      .then(channel => resolve(channel))
      .catch(err => reject(err));
  });
};

const channelAssertQueue = (channel, queueName = 'orderQueue') => {
  return new Promise((resolve, reject) => {
    channel
      .assertQueue(queueName, { durable: true })
      .then(asserted => resolve(channel))
      .catch(err => reject(err));
  });
};

export const sendToQueue = (channel, message, queueName = 'orderQueue') => {
  const buffer = Buffer.from(message);
  channel.sendToQueue(queueName, buffer);
};

export const receiveFromQueue = (
  channel,
  callback,
  queueName = 'orderQueue',
) => {
  channel.consume(
    queueName,
    message => {
      if (message !== null) {
        const order = JSON.parse(message.content.toString());
        console.log('Received order:', order);

        // Acknowledge the message to remove it from the queue
        channel.ack(message);
        callback();
      }
    },
    { noAck: true },
  );
};

export const createConnection = async (queueName = 'msg.*') => {
  const conn = await connect();
  const channel = await createChannel(conn);
  const assertedChannelToQueue = await channelAssertQueue(channel, queueName);
  return { channel, assertedChannelToQueue };
};
