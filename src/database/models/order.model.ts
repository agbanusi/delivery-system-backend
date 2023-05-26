import { Model } from 'objection';
import { BaseModel } from './base.model';
import { LogModel } from './log.model';
import { OrderTotalAmountHistoryModel } from './order-total-amount-history';
import { CalculatedOrderModel } from './calculated-order.model';
import { OrderTypeModel } from './order-type.model';
import { UserModel } from './user.model';

export class OrderModel extends BaseModel {
  static get tableName() {
    return 'orders';
  }

  user_id: string;
  completed: boolean;
  cancelled: boolean;
  kitchen_cancelled: boolean;
  kitchen_accepted: boolean;
  kitchen_dispatched: boolean;
  kitchen_dispatched_time: Date;
  completed_time: Date;
  rider_id: string;
  kitchen_prepared: boolean;
  rider_assigned: boolean;
  paid: boolean;
  order_code: string;
  order_change: string | null;
  calculated_order_id: string;
  order_type_id: string;
  created_at: Date;
  updated_at: Date;
  logs: LogModel[];
  kitchen_verified_time: Date;
  kitchen_completed_time: Date;
  shop_accepted: boolean;
  shop_prepared: boolean;
  no_of_mealbags_delivered: number;
  no_of_drinks_delivered: number;
  rider_started_time: Date | null;
  rider_started: boolean;
  rider_arrived_time: Date | null;
  rider_arrived: boolean;
  is_failed_trip: boolean;
  failed_trip_details: object;
  box_number: string;
  shelf_id: string | null;
  order_total_amount_history: OrderTotalAmountHistoryModel[];
  scheduled: boolean;
  confirmed_by_id: string | null;
  completed_by_id: string | null;
  scheduled_delivery_date: Date | null;
  scheduled_delivery_time: Date | null;
  is_hidden: boolean;
  calculated_order: CalculatedOrderModel;
  lat: string;
  lng: string;
  cokitchen_polygon_id: string;
  cokitchen_id: string;
  pickup: boolean;
  prev_price: string;
  order_type: OrderTypeModel;

  static relationMappings = {
    logs: {
      relation: Model.HasManyRelation,
      modelClass: LogModel,
      join: {
        from: 'orders.id',
        to: 'logs.order_id',
      },
    },
    order_total_amount_history: {
      relation: Model.HasManyRelation,
      modelClass: OrderTotalAmountHistoryModel,
      join: {
        from: 'orders.id',
        to: 'order_total_amount_history.order_id',
      },
    },
    calculated_order: {
      relation: Model.HasOneRelation,
      modelClass: CalculatedOrderModel,
      join: {
        from: 'orders.calculated_order_id',
        to: 'calculated_orders.id',
      },
    },
    order_type: {
      relation: Model.BelongsToOneRelation,
      modelClass: OrderTypeModel,
      join: {
        from: 'orders.order_type_id',
        to: 'order_types.id',
      },
    },

    user: {
      relation: Model.HasManyRelation,
      modelClass: UserModel,
      join: {
        from: 'orders.user_id',
        to: 'users.id',
      },
    },
  };
}
