import * as Knex from 'knex';

exports.up = function(knex: Knex) {
  return knex.schema.createTable('calculated_orders', function(table) {
    table.increments('id').primary();
    table.integer('order_id').notNullable();
    table.integer('total_amount').notNullable();
    table.boolean('free_delivery').notNullable();
    table.integer('delivery_fee').notNullable();
    table.integer('service_charge').notNullable();
    table.string('address_details').notNullable();
    table.jsonb('meals').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex: Knex) {
  return knex.schema.dropTable('calculated_orders');
};
