import { knex } from 'knex';
const config = require('./knexfile');
import { Model } from 'objection';

const setupDB = () => {
    console.log("Setting up DB")
    const modifiedConfig = config.development;
    // LOCALDEV_NOTE: Uncomment the below lines for localdev environment
    // modifiedConfig.connection =
    // "postgres://postgres:admin@server-db-1:5432/ar_db";
    const db = knex(modifiedConfig);
    Model.knex(db);
    return db;
}

export default setupDB;