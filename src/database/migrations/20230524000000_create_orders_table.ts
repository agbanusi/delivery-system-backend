import * as Knex from 'knex';

exports.up = function(knex: Knex) {
  return knex.schema.createTable('orders', function(table) {
    table.increments('id').primary();
    table.integer('user_id').notNullable();
    table.boolean('completed').notNullable();
    table.boolean('cancelled').notNullable();
    table.boolean('kitchen_cancelled').notNullable();
    table.boolean('kitchen_accepted').notNullable();
    table.boolean('kitchen_dispatched').notNullable();
    table.timestamp('kitchen_dispatched_time').nullable();
    table.timestamp('completed_time').nullable();
    table.integer('rider_id').nullable();
    table.boolean('kitchen_prepared').notNullable();
    table.boolean('rider_assigned').notNullable();
    table.boolean('paid').notNullable();
    table.string('order_code').notNullable();
    table.jsonb('order_change').nullable();
    table.integer('calculated_order_id').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.jsonb('logs').notNullable();
    table.timestamp('kitchen_verified_time').notNullable();
    table.timestamp('kitchen_completed_time').notNullable();
    table.boolean('shop_accepted').notNullable();
    table.boolean('shop_prepared').notNullable();
    table.integer('no_of_mealbags_delivered').notNullable();
    table.integer('no_of_drinks_delivered').notNullable();
    table.timestamp('rider_started_time').nullable();
    table.boolean('rider_started').notNullable();
    table.timestamp('rider_arrived_time').nullable();
    table.boolean('rider_arrived').notNullable();
    table.boolean('is_failed_trip').notNullable();
    table.jsonb('failed_trip_details').notNullable();
    table.string('box_number').notNullable();
    table.string('shelf_id').nullable();
    table.jsonb('order_total_amount_history').notNullable();
    table.boolean('scheduled').notNullable();
    table.integer('confirmed_by_id').nullable();
    table.integer('completed_by_id').nullable();
    table.date('scheduled_delivery_date').nullable();
    table.time('scheduled_delivery_time').nullable();
    table.boolean('is_hidden').notNullable();
    table.integer('order_type_id').notNullable();
  });
};

exports.down = function(knex: Knex) {
  return knex.schema.dropTable('orders');
};
