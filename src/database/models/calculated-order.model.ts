
import { BaseModel } from './base.model';
import { Model } from 'objection';
import { MealModel } from './meal.model';

// export class CalculatedOrder extends BaseModel {
//   static get tableName() {
//     return 'calculated_order';
//   }

//   static get relationMappings() {
//     return {
//       order: {
//         relation: Model.BelongsToOneRelation,
//         modelClass: Order,
//         join: {
//           from: 'calculated_order.id',
//           to: 'orders.calculated_order_id',
//         },
//       },
//     };
//   }

//   static get jsonSchema() {
//     return {
//       type: 'object',
//       required: ['total_amount', 'free_delivery', 'delivery_fee', 'service_charge', 'address_details', 'meals'],

//       properties: {
//         // id: { type: 'integer' },
//         total_amount: { type: 'string' },
//         free_delivery: { type: 'boolean' },
//         delivery_fee: { type: 'string' },
//         service_charge: { type: 'string' },
//         address_details: {
//           type: 'object',
//           properties: {
//             city: { type: 'string' },
//             name: { type: 'string' },
//             address_line: { type: 'string' },
//             building_number: { type: 'string' },
//           },
//         },
//         meals: {
//           type: 'array',
//           items: {
//             type: 'object',
//             properties: {
//               brand: {
//                 type: 'object',
//                 properties: {
//                   id: { type: 'string' },
//                   name: { type: 'string' },
//                 },
//               },
//               meals: {
//                 type: 'array',
//                 items: {
//                   type: 'object',
//                   properties: {
//                     id: { type: 'string' },
//                     new: { type: 'boolean' },
//                     name: { type: 'string' },
//                     brand: {
//                       type: 'object',
//                       properties: {
//                         id: { type: 'string' },
//                         name: { type: 'string' },
//                       },
//                     },
//                     active: { type: 'boolean' },
//                     addons: {
//                       type: 'array',
//                       items: {
//                         type: 'object',
//                         properties: {
//                           id: { type: 'string' },
//                           amount: { type: 'number' },
//                           meal_id: { type: 'string' },
//                           meal_data: {
//                             type: 'object',
//                             properties: {
//                               id: { type: 'string' },
//                               name: { type: 'string' },
//                               active: { type: 'boolean' },
//                               amount: { type: 'string' },
//                               brand_id: { type: 'string' },
//                               item_type: { type: 'string' },
//                               created_at: { type: 'string', format: 'date-time' },
//                               updated_at: { type: 'string', format: 'date-time' },
//                             },
//                           },
//                           created_at: { type: 'string', format: 'date-time' },
//                           updated_at: { type: 'string', format: 'date-time' },
//                           meal_addon_id: { type: 'string' },
//                           internal_profit: { type: 'integer' },
//                           min_selection_no: { type: 'string' },
//                           meal_addon_category_id: { type: 'string' },
//                         },
//                       },
//                     },
//                     amount: { type: 'string' },
//                     images: {
//                       type: 'array',
//                       items: { type: 'string' },
//                     },
//                     alcohol: { type: 'boolean' },
//                     item_no: { type: 'string' },
//                     summary: { type: 'string' },
//                     brand_id: { type: 'string' },
//                     calories: { type: 'string' },
//                     is_addon: { type: 'boolean' },
//                     is_combo: { type: 'boolean' },
//                     position: { type: 'integer' },
//                     quantity: { type: 'integer' },
//                     home_page: { type: 'boolean' },
//                     item_type: { type: 'string' },
//                     meal_tags: {
//                       type: 'array',
//                       items: { type: 'string' },
//                     },
//                     created_at: { type: 'string', format: 'date-time' },
//                     is_deleted: { type: 'boolean' },
//                     order_note: { type: 'string' },
//                     updated_at: { type: 'string', format: 'date-time' },
//                     description: { type: 'string' },
//                     minimum_age: { type: 'string' },
//                     posist_data: {},
//                     available_no: { type: 'string' },
//                     meal_keywords: {
//                       type: 'array',
//                       items: { type: 'string' },
//                     },
//                     internal_profit: { type: 'integer' },
//                     meal_category_id: { type: 'string' },
//                   },
//                 },
//               },
//               amount: { type: 'integer' },
//               internal_profit: { type: 'integer' },
//             },
//           },
//         },
//       },
//     };
//   }
// }

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
  meals:{
    brand: {
      id: string;
      name: string;
    };
    meals: MealModel[];
  }[]

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

