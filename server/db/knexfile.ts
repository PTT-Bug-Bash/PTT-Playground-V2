import type { Knex } from "knex";

// Update with your config settings.

module.exports = {
  development: {
    client: "postgresql",
    //connection: {
    //  host: "localhost" || "server-db-1",
    //  port: 5432,
    //  database: "ar_db",
    //  user: "postgres",
    //  password: "admin"
    //},
    // LOCALDEV_NOTE: For local dev, the "connection" field should be set to: postgres://postgres:admin@localhost:5432/ar_db
    // connection: "postgres://postgres:admin@localhost:5432/ar_db" ,
    connection: "postgres://postgres:ARAdmin23@ar-stack-v2-dbinstance-zhxiewo7hkum.cuyaacrktzkt.us-west-2.rds.amazonaws.com:5432/ARDB",
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./migrations",
      tableName: "knex_migrations"
    },
    seeds: { directory: "./seeds" }
  },

  // production: {
  //   client: "postgresql",
  //   connection: {
  //     database: "my_db",
  //     user: "username",
  //     password: "password"
  //   },
  //   pool: {
  //     min: 2,
  //     max: 10
  //   },
  //   migrations: {
  //     tableName: "knex_migrations"
  //   }
  // }

};