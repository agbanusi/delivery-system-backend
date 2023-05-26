import { BaseModel } from './base.model';
import { Model } from 'objection';
import { CalculatedOrderModel } from './calculated-order.model';

export class MealModel extends BaseModel {
  static get tableName() {
    return 'meals';
  }

  calculated_order_id: string;
  new: boolean;
  name: string;
  brand: {
    id: string;
    name: string;
  };
  active: boolean;
  addons: {
    id: string;
    amount: number;
    meal_id: string;
    meal_data: {
      id: string;
      name: string;
      active: boolean;
      amount: string;
      brand_id: string;
      item_type: string;
      created_at: Date;
      updated_at: Date;
    };
    created_at: Date;
    updated_at: Date;
    meal_addon_id: string;
    internal_profit: number;
    min_selection_no: string;
    meal_addon_category_id: string;
  }[];
  amount: string;
  images: string[];
  alcohol: boolean;
  item_no: string | null;
  summary: string | null;
  brand_id: string;
  calories: string;
  is_addon: boolean;
  is_combo: boolean;
  position: number;
  quantity: number;
  home_page: boolean;
  item_type: string;
  meal_tags: string[];
  created_at: Date;
  is_deleted: boolean;
  order_note: string;
  updated_at: Date;
  description: string;
  minimum_age: string;
  posist_data: object;
  available_no: string;
  meal_keywords: string[];
  internal_profit: number;
  meal_category_id: string;

  static get relationMappings() {
    return {
      calculatedOrder: {
        relation: Model.BelongsToOneRelation,
        modelClass: CalculatedOrderModel,
        join: {
          from: 'meals.calculated_order_id',
          to: 'calculated_orders.id',
        },
      },
    };
  }
}
