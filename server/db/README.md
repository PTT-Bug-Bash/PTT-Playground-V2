# Knex Migration Files

The file 20231031212551_init.js contains the initialized version of the schema.
The file 20231117044540_version6.js contains the newest version of the schema that follows 'version6schema.pdf'.
The file 20240415000000_version7.js contains the newest version of the schema that follows 'version<>schema.pdf' (TODO). 


Creating a new migration file:

1. Go into the /server directory
2. Execute the command: `npx knex migrate:make <name_of_migration_file> -x ts --knexfile ./db/knexfile.ts`

To go back to a previous version of the database:

1. Go into the /server directory
2. Execute the command: `npx knex migrate:down --knexfile ./db/knexfile.ts`

To go up to a newer version of the database:

1. Go into the /server directory
2. Execute the command: `npx knex migrate:up --knexfile ./db/knexfile.ts`

To go up to the latest version of the database:

1. Go into the /server directroy
2. Execute the command: `npx knex migrate:latest --knexfile ./db/knexfile.ts`

# Knex Seeding Files

In order to create a new seeding file do the following command:

1. Go into /server/db directory
2. Execute the command: `npx knex seed:make <name_of_seed_file.ts>`

Once you have made the seeding file, running the seeding file is done as so:

1. Go into /server directory
2. Execute the command: `npx knex seed:run --knexfile ./db/knexfile.ts --specific <name_of_seed_file.ts>`

# Local Dev if AWS is not working

inside file db-setup and Knexfile you will uncomment some of the lines to use local dev rather than connecting to AWS
