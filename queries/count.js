// @ts-nocheck
const { QueryTypes } = require('sequelize');

const db = require('../database');
const log = require('../utilities/log');

const { SELECT } = QueryTypes;

/**
 * Count User records in the database
 * @returns {Promise<void|Error>}
 */
module.exports = async () => {
  try {
    // use Sequelize
    const timeBefore = Date.now();
    const count = await db.Users.count();
    const timeAfter = Date.now();
    log(`count users: ${timeAfter - timeBefore} ms, ${count} users`);
    
    // RAW
    const timeRawBefore = Date.now();
    const [{ count: countRaw = '0' }] = await db.database.query(
      'SELECT count(*) FROM "Users"',
      {
        type: SELECT,
      },
    );
    const timeRawAfter = Date.now();
    return log(`count users [RAW]: ${
      timeRawAfter - timeRawBefore
    } ms, ${countRaw} users\n`);
  } catch (error) {
    throw error;
  }
};
