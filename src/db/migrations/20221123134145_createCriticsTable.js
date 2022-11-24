exports.up = function (knex) {
  return knex.schema.createTable("critics", (table) => {
    table.increments("critic_id").primary().unique();
    table.string("preferred_name");
    table.string("surname");
    table.string("organization_name");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("critics");
};

/*
The `critics` table represents movie critics who have created reviews for movies. Each critic has the following fields:
- `critic_id`: (Primary Key) A unique ID for the critic.
- `preferred_name`: (String) The critic's preferred first name.
- `surname`: (String) The critic's last name.
- `organization_name`: (String) The name of the organization the critic works for.
*/
