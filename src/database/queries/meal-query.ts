import * as Knex from 'knex';
import * as knexConfig from '../knex';

export const getMostBoughtMeal = async () => {
  const knex: Knex = Knex(knexConfig);
  const query = `
  SELECT meal.name, MAX(meal.quantity) AS highest_quantity
  FROM calculated_orders
  JOIN meals ON calculated_orders.id = meals.calculated_order_id
  GROUP BY meal.name
  ORDER BY highest_quantity DESC
  LIMIT 1;`;
  const result = await knex.raw(query);

  return result.rows;
};
