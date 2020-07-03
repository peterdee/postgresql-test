// @ts-nocheck
const dotenv = require('dotenv').config();
if (dotenv.error) {
  throw dotenv.error;
}

const { QueryTypes } = require('sequelize');

const db = require('./database/index');

const log = (string) => console.log(string);
const { SELECT } = QueryTypes;

(async function run() {
  try {
    // prepare the database
    await db.database.query(
      'SELECT count(*) FROM "Users"',
      {
        type: SELECT,
      },
    );

    // count user records [RAW]
    const countBefore = Date.now();
    const count = await db.Users.count();
    const countAfter = Date.now();
    log(`count users: ${countAfter - countBefore} ms, ${count} users`);

    // count user records [RAW]
    const countRawBefore = Date.now();
    const [{ count: countRaw = '0' }] = await db.database.query(
      'SELECT count(*) FROM "Users"',
      {
        type: SELECT,
      },
    );
    const countRawAfter = Date.now();
    log(`count users [RAW]: ${countRawAfter - countRawBefore} ms, ${countRaw} users\n`);

    // load single record without a condition
    const singleBefore = Date.now();
    await db.Users.findOne();
    const singleAfter = Date.now();
    log(`load single record without a condition: ${singleAfter - singleBefore} ms`);

    // load single record without a condition [RAW]
    const singleRawBefore = Date.now();
    await db.database.query(
      'SELECT * FROM "Users" LIMIT 1',
      {
        type: SELECT,
      },
    );
    const singleRawAfter = Date.now();
    log(`load single record without a condition [RAW]: ${singleRawAfter - singleRawBefore} ms`);

    return process.exit(0);
  } catch (error) {
    throw error;
  }
}());
