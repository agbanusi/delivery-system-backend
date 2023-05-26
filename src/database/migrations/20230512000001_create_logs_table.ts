import * as Knex from 'knex';

exports.up = function(knex: Knex) {
  return knex.schema.createTable('logs', function(table) {
    table.increments('id').primary();
    table.integer('order_id').notNullable();
    table.timestamp('time').defaultTo(knex.fn.now());
    table.string('description').notNullable();
  });
};

exports.down = function(knex: Knex) {
  return knex.schema.dropTable('logs');
};
