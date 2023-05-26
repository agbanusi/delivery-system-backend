import { Controller, Get, Body, Post } from '@nestjs/common';
import { LogsService } from './logs.service';

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Get()
  findAll() {
    return this.logsService.findAll();
  }

  @Post()
  create(@Body() user) {
    return this.logsService.create(user);
  }
}
