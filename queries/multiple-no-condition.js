// @ts-nocheck
const { QueryTypes } = require('sequelize');

const db = require('../database');
const log = require('../utilities/log');

const { SELECT } = QueryTypes;

/**
 * Get multiple User records without any conditions
 * @returns {Promise<void|Error>}
 */
module.exports = async () => {
  try {
    // use Sequelize
    const timeBefore = Date.now();
    await db.Users.findAll({
      limit: 500,
      order: [['created', 'DESC']],
      offset: 500,
      raw: true,
    });
    const timeAfter = Date.now();
    log(`load multiple records without any condition: ${timeAfter - timeBefore} ms`);
    
    // RAW
    const timeRawBefore = Date.now();
    await db.database.query(
      'SELECT * FROM "Users" ORDER BY created DESC LIMIT 500 OFFSET 500',
      {
        type: SELECT,
      },
    );
    const timeRawAfter = Date.now();
    return log(`load multiple records without any condition [RAW]: ${
      timeRawAfter - timeRawBefore
    } ms\n`);
  } catch (error) {
    throw error;
  }
};
