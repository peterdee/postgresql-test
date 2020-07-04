// @ts-nocheck
const dotenv = require('dotenv').config();
if (dotenv.error) {
  throw dotenv.error;
}

const { QueryTypes } = require('sequelize');

const db = require('./database/index');
const log = require('./utilities/log');

const count = require('./queries/count');
const multipleNoCondition = require('./queries/multiple-no-condition');
const singleNoCondition = require('./queries/single-no-condition');

const { SELECT } = QueryTypes;

// run
(async function run() {
  try {
    // prepare the database
    await db.database.query(
      'SELECT count(*) FROM "Users"',
      {
        type: SELECT,
      },
    );
    log('\ndatabase ready\n');

    // count users
    await count();

    // load a single User record without any conditions
    await singleNoCondition();

    // load multiple User records without any conditions
    await multipleNoCondition();

    return process.exit(0);
  } catch (error) {
    throw error;
  }
}());
