import { BaseModel } from './base.model';
import { Model } from 'objection';
import { MealModel } from './meal.model';

export class CalculatedOrderModel extends BaseModel {
  static get tableName() {
    return 'calculated_orders';
  }

  total_amount: string;
  free_delivery: boolean;
  delivery_fee: string;
  service_charge: string;
  address_details: {
    city: string;
    name: string;
    address_line: string;
    building_number: string;
  };
  meals: {
    brand: {
      id: string;
      name: string;
    };
    meals: MealModel[];
  }[];

  static relationMappings = {
    meals: {
      relation: Model.HasManyRelation,
      modelClass: MealModel,
      join: {
        from: 'calculated_orders.id',
        to: 'meals.calculated_order_id',
      },
    },
  };
}
