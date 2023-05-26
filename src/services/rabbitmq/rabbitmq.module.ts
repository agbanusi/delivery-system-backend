import { Module } from '@nestjs/common';
import { RabbitMQWorkerService } from './rabbitmq-worker.service';

@Module({
  providers: [RabbitMQWorkerService],
})
export class RabbitMQModule {}
