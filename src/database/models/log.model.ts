import { BaseModel } from './base.model';
import {OrderModel} from './order.model'
import { Model } from 'objection';

export class LogModel extends BaseModel {
  static get tableName() {
    return 'logs';
  }

  order_id: string;
  time: Date;
  description: string;

  static relationMappings = {
    order: {
      relation: Model.BelongsToOneRelation,
      modelClass: OrderModel,
      join: {
        from: 'logs.order_id',
        to: 'orders.id',
      },
    },
  };
}
