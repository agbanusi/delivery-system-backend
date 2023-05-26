import * as Knex from 'knex';

exports.up = function(knex: Knex) {
  return knex.schema.createTable('meals', function(table) {
    table.string('id').primary();
    table.boolean('calculated_order_id').notNullable();
    table.boolean('new').notNullable();
    table.string('name').notNullable();
    table.string('brand_id').notNullable();
    table.boolean('active').notNullable();
    table.jsonb('addons').notNullable();
    table.string('amount').notNullable();
    table.jsonb('images').notNullable();
    table.boolean('alcohol').notNullable();
    table.string('item_no').nullable();
    table.string('summary').nullable();
    table.string('calories').notNullable();
    table.boolean('is_addon').notNullable();
    table.boolean('is_combo').notNullable();
    table.integer('position').notNullable();
    table.integer('quantity').notNullable();
    table.boolean('home_page').notNullable();
    table.string('item_type').notNullable();
    table.jsonb('meal_tags').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.boolean('is_deleted').notNullable();
    table.string('order_note').notNullable();
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.string('description').notNullable();
    table.string('minimum_age').notNullable();
    table.jsonb('posist_data').notNullable();
    table.string('available_no').notNullable();
    table.jsonb('meal_keywords').notNullable();
    table.integer('internal_profit').notNullable();
    table.string('meal_category_id').notNullable();
  });
};

exports.down = function(knex: Knex) {
  return knex.schema.dropTable('meals');
};
