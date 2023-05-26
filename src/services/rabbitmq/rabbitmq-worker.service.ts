import * as amqp from 'amqplib';
import { Injectable } from '@nestjs/common';
import { receiveFromQueue, createConnection } from './rabbitmq.service';

@Injectable()
export class RabbitMQWorkerService {
  private queueName = 'orderQueue';

  async startWorker() {
    const { channel } = await createConnection(this.queueName);
    receiveFromQueue(channel, this.processMessage.bind(this), this.queueName);
  }

  processMessage(order: any) {
    // Process the received order message
    console.log('Received order: ', order);
    // Extra Logic
  }
}
