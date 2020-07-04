// @ts-nocheck
const { QueryTypes } = require('sequelize');

const db = require('../database');
const log = require('../utilities/log');

const { SELECT } = QueryTypes;

/**
 * Get a single User record without any conditions
 * @returns {Promise<void|Error>}
 */
module.exports = async () => {
  try {
    // use Sequelize
    const timeBefore = Date.now();
    await db.Users.findOne({ raw: true });
    const timeAfter = Date.now();
    log(`load single record without a condition: ${timeAfter - timeBefore} ms`);
    
    // RAW
    const timeRawBefore = Date.now();
    await db.database.query(
      'SELECT * FROM "Users" LIMIT 1',
      {
        type: SELECT,
      },
    );
    const timeRawAfter = Date.now();
    return log(`load single record without a condition [RAW]: ${
      timeRawAfter - timeRawBefore
    } ms\n`);
  } catch (error) {
    throw error;
  }
};
