import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get('/popular')
  getPopularMeal() {
    //number of times a meal have been bought
    return this.orderService.getMostPopularMeal();
  }

  @Get('/grossing')
  getMostBoughtMeal() {
    // total quantity of meal bought
    return this.orderService.getMostBoughtMeal();
  }

  @Get('/test/trigger')
  trigger() {
    //trigger test queue (debug purposes)
    return this.orderService.trigger();
  }

  @Post()
  create(@Body() createOrder) {
    const newOrder = this.orderService.create(createOrder);
    return newOrder;
  }
}
