import { Injectable, Inject } from '@nestjs/common';
import { OrderModel } from 'src/database/models/order.model';
import { ModelClass } from 'objection';
import {
  createConnection,
  sendToQueue,
} from 'src/services/rabbitmq/rabbitmq.service';
import {
  getAllOrdersWithDetails,
  getMostBoughtMeal,
  getMostPopularMeal,
} from 'src/database/queries';

export interface ResponseData {
  readonly success: boolean;
  readonly message: string;
  readonly data: any;
}

@Injectable()
export class OrderService {
  constructor(
    @Inject('OrderModel') private modelClass: ModelClass<OrderModel>,
  ) {}

  async findAll(): Promise<ResponseData> {
    // const orders = await this.modelClass
    //   .query()
    //   .withGraphFetched('user')
    //   .withGraphFetched('comments');
    const orders = getAllOrdersWithDetails();
    return {
      success: true,
      message: 'Orders fetched successfully.',
      data: orders,
    };
  }

  async getMostPopularMeal(): Promise<ResponseData> {
    const mostPopularMeal = getMostPopularMeal();

    if (mostPopularMeal) {
      return {
        success: true,
        message: 'Most popular meal fetched successfully.',
        data: mostPopularMeal,
      };
    } else {
      return {
        success: false,
        message: 'No meals found.',
        data: null,
      };
    }
  }

  async getMostBoughtMeal(): Promise<ResponseData> {
    const mostBoughtMeal = getMostBoughtMeal();

    if (mostBoughtMeal) {
      return {
        success: true,
        message: 'Most bought meal fetched successfully.',
        data: mostBoughtMeal,
      };
    } else {
      return {
        success: false,
        message: 'No meals found.',
        data: null,
      };
    }
  }

  async create(orderData): Promise<ResponseData> {
    const order = await this.modelClass.query().insert(orderData);
    const { channel } = await createConnection();
    sendToQueue(channel, order);
    return {
      success: true,
      message: 'Order created successfully.',
      data: order,
    };
  }

  async trigger(): Promise<ResponseData> {
    const { channel } = await createConnection();
    sendToQueue(channel, { name: 'test push message' });
    return {
      success: true,
      message: 'Test done successfully.',
      data: null,
    };
  }
}
