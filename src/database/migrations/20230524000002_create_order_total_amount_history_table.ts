import * as Knex from 'knex';

exports.up = function(knex: Knex) {
  return knex.schema.createTable('order_total_amount_history', function(table) {
    table.increments('id').primary();
    table.integer('order_id').notNullable();
    table.timestamp('time').defaultTo(knex.fn.now());
    table.integer('total_amount').notNullable();
  });
};

exports.down = function(knex: Knex) {
  return knex.schema.dropTable('order_total_amount_history');
};
