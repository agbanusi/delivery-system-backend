import * as Knex from 'knex';
import * as knexConfig from '../knex';
const getOrdersWithRelatedData = async () => {
  const knex: Knex = Knex(knexConfig);
  const orders = await knex('orders')
    .select('*')
    .leftJoin('logs', 'orders.id', 'logs.order_id')
    .leftJoin('calculated_orders', 'orders.id', 'calculated_orders.order_id')
    .leftJoin(
      'order_total_amount_history',
      'orders.id',
      'order_total_amount_history.order_id',
    );

  return orders;
};

export const getAllOrdersWithDetails = async () => {
  const knex: Knex = Knex(knexConfig);
  const query = `
  SELECT orders.*, 
           logs.*, 
           calculated_order.*, 
           order_total_amount_history.*, 
           order_type.*
    FROM orders
    LEFT JOIN logs ON orders.id = logs.order_id
    LEFT JOIN calculated_order ON orders.calculated_order_id = calculated_order.id
    LEFT JOIN order_total_amount_history ON orders.id = order_total_amount_history.order_id
    LEFT JOIN order_type ON orders.order_type_id = order_type.id`;
  const result = await knex.raw(query);

  return result.rows;
};

const getAllOrders = async () => {
  const knex: Knex = Knex(knexConfig);
  const query = `
  SELECT 
  orders.*,
  JSON_AGG(JSONB_BUILD_OBJECT('time', logs.time, 'description', logs.description)) AS logs,
  JSONB_BUILD_OBJECT(
    'id', calculated_order.id,
    'total_amount', calculated_order.total_amount,
    'free_delivery', calculated_order.free_delivery,
    'delivery_fee', calculated_order.delivery_fee,
    'service_charge', calculated_order.service_charge,
    'address_details', calculated_order.address_details,
    'meals', (
      SELECT JSON_AGG(meals)
      FROM meals
      WHERE meals.calculated_order_id = calculated_order.id
    )
  ) AS calculated_order,
  JSON_AGG(JSONB_BUILD_OBJECT('time', order_total_amount_history.time, 'total_amount', order_total_amount_history.total_amount)) AS order_total_amount_history,
  JSONB_BUILD_OBJECT('id', order_type.id, 'name', order_type.name) AS order_type
  FROM orders
  LEFT JOIN logs ON orders.id = logs.order_id
  LEFT JOIN calculated_order ON orders.calculated_order_id = calculated_order.id
  LEFT JOIN order_total_amount_history ON orders.id = order_total_amount_history.order_id
  LEFT JOIN order_type ON orders.order_type_id = order_type.id
  GROUP BY orders.id, calculated_order.id, order_type.id`;

  const result = await knex.raw(query);

  return result.rows;
};

const getOrderDetails = async (orderId: string) => {
  const knex: Knex = Knex(knexConfig);
  const query = `
    SELECT orders.*, order_type.name as order_type_name,
    JSON_AGG(DISTINCT jsonb_build_object('time', logs.time, 'description', logs.description)) as logs,
    JSON_AGG(DISTINCT jsonb_build_object('time', order_total_amount_history.time, 'total_amount', order_total_amount_history.total_amount)) as order_total_amount_history,
    calculated_order.total_amount as calculated_order_total_amount,
    JSON_AGG(DISTINCT jsonb_build_object(
        'id', meals.id, 'new', meals.new, 'name', meals.name, 'brand',
        jsonb_build_object('id', brand.id, 'name', brand.name)
    )) as meals
    FROM orders
    LEFT JOIN order_type ON orders.order_type_id = order_type.id
    LEFT JOIN logs ON logs.order_id = orders.id
    LEFT JOIN order_total_amount_history ON order_total_amount_history.order_id = orders.id
    LEFT JOIN calculated_order ON calculated_order.id = orders.calculated_order_id
    LEFT JOIN meal_orders ON meal_orders.order_id = orders.id
    LEFT JOIN meals ON meals.id = meal_orders.meal_id
    LEFT JOIN brands AS brand ON meals.brand_id = brand.id
    WHERE orders.id = :orderId
    GROUP BY orders.id, order_type.name, calculated_order.total_amount`;

  const result = await knex.raw(query, { orderId });

  return result.rows;
};

module.exports = {
  getOrdersWithRelatedData,
  getAllOrdersWithDetails,
  getAllOrders,
  getOrderDetails,
};
