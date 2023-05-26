import * as Knex from 'knex';
import * as knexConfig from '../knex';

//major function to be used
export const getAllOrdersWithDetails = async () => {
  const knex: Knex = Knex(knexConfig);
  const query = `
  SELECT orders.*, 
           logs.*, 
           calculated_orders.*, 
           order_total_amount_history.*, 
           order_types.*
    FROM orders
    LEFT JOIN logs ON orders.id = logs.order_id
    LEFT JOIN calculated_orders ON orders.calculated_order_id = calculated_orders.id
    LEFT JOIN order_total_amount_history ON orders.id = order_total_amount_history.order_id
    LEFT JOIN order_types ON orders.order_type_id = order_types.id`;
  const result = await knex.raw(query);

  return result.rows;
};

//prefer this because of json build but due to sql peformance, the other function will be used
const getAllOrdersJSON = async () => {
  const knex: Knex = Knex(knexConfig);
  const query = `
  SELECT 
  orders.*,
  JSON_AGG(JSONB_BUILD_OBJECT('time', logs.time, 'description', logs.description)),
  JSONB_BUILD_OBJECT(
    'id', calculated_orders.id,
    'total_amount', calculated_orders.total_amount,
    'free_delivery', calculated_orders.free_delivery,
    'delivery_fee', calculated_orders.delivery_fee,
    'service_charge', calculated_orders.service_charge,
    'address_details', calculated_orders.address_details
  ),
  JSON_AGG(JSONB_BUILD_OBJECT('time', order_total_amount_history.time, 'total_amount', order_total_amount_history.total_amount)),
  JSONB_BUILD_OBJECT(
    'id', order_types.id,
    'name', order_types.name
  )
  FROM orders
  LEFT JOIN logs ON orders.id = logs.order_id
  LEFT JOIN calculated_orders ON orders.calculated_order_id = calculated_orders.id
  LEFT JOIN order_total_amount_history ON orders.id = order_total_amount_history.order_id
  LEFT JOIN order_types ON orders.order_type_id = order_types.id
  GROUP BY orders.id, calculated_orders.id, order_types.id`;

  const result = await knex.raw(query);
  return result.rows;
};

module.exports = {
  getAllOrdersWithDetails,
  getAllOrdersJSON,
};
