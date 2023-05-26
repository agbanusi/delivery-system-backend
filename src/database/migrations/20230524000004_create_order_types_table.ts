import * as Knex from 'knex';

exports.up = function(knex: Knex) {
  return knex.schema.createTable('order_types', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.boolean('active').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex: Knex) {
  return knex.schema.dropTable('order_types');
};
