import * as Knex from 'knex';
import * as knexConfig from '../knex';

//highest quantity of same meal ordered ever
export const getMostBoughtMeal = async () => {
  const knex: Knex = Knex(knexConfig);
  const query = `
  SELECT name, SUM(quantity) AS total_quantity
  FROM meals
  GROUP BY name
  ORDER BY total_quantity DESC
  LIMIT 1;`;
  const result = await knex.raw(query);
  return result.rows[0];
};

//number of times a meal was ordered uniquely

export const getMostPopularMeal = async () => {
  const knex: Knex = Knex(knexConfig);
  const query = `
  SELECT name, COUNT(*) AS total_bought
  FROM meals
  GROUP BY name
  ORDER BY total_bought DESC
  LIMIT 1;`;
  const result = await knex.raw(query);
  return result.rows[0];
};

// const query = `
// SELECT merged_meals.name, MAX(merged_meals.quantity) AS highest_quantity
// FROM calculated_orders
// JOIN LATERAL (
//   SELECT meals.*
//   FROM JSONB_ARRAY_ELEMENTS(calculated_orders.meals) AS nested_meal
//   JOIN meals ON nested_meal->>'id' = meals.id
// ) AS merged_meals ON true
// GROUP BY merged_meals.name
// ORDER BY highest_quantity DESC
// LIMIT 1;`;
