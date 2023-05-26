import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Post()
  create(@Body() createOrder) {
    const newOrder = this.orderService.create(createOrder);
    return newOrder;
  }
}
