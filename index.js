// @ts-nocheck
const dotenv = require('dotenv').config();
if (dotenv.error) {
  throw dotenv.error;
}

const { QueryTypes } = require('sequelize');

const db = require('./database/index');
const log = require('./utilities/log');

const count = require('./queries/count');
const joinMultipleNoCondition = require('./queries/join-multiple-no-condition');
const joinMultipleWithCondition = require('./queries/join-multiple-with-condition');
const joinSingleNoCondition = require('./queries/join-single-no-condition');
const joinSingleWithCondition = require('./queries/join-single-with-condition');
const multipleNoCondition = require('./queries/multiple-no-condition');
const multipleWithCondition = require('./queries/multiple-with-condition');
const singleNoCondition = require('./queries/single-no-condition');
const singleWithCondition = require('./queries/single-with-condition');

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

    // load a single User record with conditions
    await singleWithCondition();

    // load multiple User records with conditions
    await multipleWithCondition();

    // load a single User record with a Related record without any conditions
    await joinSingleNoCondition();

    // load a single User record with a Related record with conditions
    await joinSingleWithCondition();

    // load multiple User records with Related records without any conditions
    await joinMultipleNoCondition();

    // load multiple User records with Related records with conditions
    await joinMultipleWithCondition();

    return process.exit(0);
  } catch (error) {
    throw error;
  }
}());
