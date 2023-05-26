import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { LogsModule } from './logs/logs.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [LogsModule, OrderModule, UsersModule],
  providers: [],
})
export class ApiModule {}
