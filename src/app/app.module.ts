import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorHandler } from '../shared/Handlers/http-error.handler';
import { LoggingInterceptor } from '../shared/Interceptors/logging.interceptor';
import { TimeoutInterceptor } from '../shared/Interceptors/timeout.interceptor';
import { ApiModule } from 'src/api/api.module';
import { DatabaseModule } from 'src/database/database.module';
import { RabbitMQModule } from 'src/services/rabbitmq/rabbitmq.module';

@Module({
  imports: [ApiModule, DatabaseModule, RabbitMQModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorHandler,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
  ],
})
export class AppModule {}
