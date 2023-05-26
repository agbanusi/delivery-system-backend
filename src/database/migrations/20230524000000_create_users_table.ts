import * as Knex from 'knex';

exports.up = function(knex: Knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.integer('user_name').notNullable();
    table.integer('first_name').notNullable();
    table.integer('last_name').notNullable();
    table.integer('email').notNullable();
    table.integer('phone').notNullable();
  });
};

exports.down = function(knex: Knex) {
  return knex.schema.dropTable('users');
};
