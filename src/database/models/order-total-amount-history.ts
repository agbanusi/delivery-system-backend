import { BaseModel } from './base.model';
import {OrderModel} from './order.model'
import { Model } from 'objection';

export class OrderTotalAmountHistoryModel extends BaseModel {
  static get tableName() {
    return 'order_total_amount_history';
  }

  order_id: string;
  time: Date;
  total_amount: number;

  static relationMappings = {
    order: {
      relation: Model.BelongsToOneRelation,
      modelClass: OrderModel,
      join: {
        from: 'order_total_amount_history.order_id',
        to: 'orders.id',
      },
    },
  };
}
