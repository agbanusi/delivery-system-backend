import { BaseModel } from './base.model';
import { Model } from 'objection';
import { OrderModel } from './order.model';

export class OrderTypeModel extends BaseModel {
  static get tableName() {
    return 'order_types';
  }

  name: string;
  created_at: Date;
  updated_at: Date;

  static relationMappings = {
    orders: {
      relation: Model.HasManyRelation,
      modelClass: OrderModel,
      join: {
        from: 'order_types.id',
        to: 'orders.order_type_id',
      },
    },
  };
}
