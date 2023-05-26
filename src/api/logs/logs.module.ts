import { Module } from '@nestjs/common';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';

@Module({
  providers: [LogsService],
  controllers: [LogsController],
})
export class LogsModule {}
