// @ts-nocheck
const { QueryTypes } = require('sequelize');

const db = require('../database');
const log = require('../utilities/log');

const { SELECT } = QueryTypes;

/**
 * Get a single User record with a Related record with conditions
 * @returns {Promise<void|Error>}
 */
module.exports = async () => {
  try { 
    // RAW
    const timeRawBefore = Date.now();
    await db.database.query(
      `SELECT * FROM "Users" a
        LEFT JOIN "Relateds" b
        ON a.id = b."userId"
        WHERE a.id >= 50000 AND a.id::VARCHAR ILIKE '%111%'
        LIMIT 1
      `,
      {
        type: SELECT,
      },
    );
    const timeRawAfter = Date.now();
    return log(`load single record with JOIN with conditions [RAW]: ${
      timeRawAfter - timeRawBefore
    } ms\n`);
  } catch (error) {
    throw error;
  }
};
