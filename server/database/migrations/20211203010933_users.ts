import { Knex } from "knex"

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("Users"))) {
    await knex.schema.createTable("Users", (table) => {
      table.increments("id")
      table.string("username")
      table.string("email")
      table.string("password")
    })
  }
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("Users")
}
