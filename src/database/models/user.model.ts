import { BaseModel } from './base.model';
import { Model } from 'objection';
import { OrderModel } from './order.model';

export class UserModel extends BaseModel {
  static tableName = 'users';

  user_name: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;

  fullName() {
    return this.first_name + ' ' + this.last_name;
  }

  orders: OrderModel[];

  static relationMappings = {
    orders: {
      modelClass: OrderModel,
      relation: Model.HasManyRelation,
      join: {
        from: 'users.id',
        to: 'orders.user_id',
      },
    },
  };
}
