// @ts-nocheck
const { QueryTypes } = require('sequelize');

const db = require('../database');
const log = require('../utilities/log');

const { SELECT } = QueryTypes;

/**
 * Get multiple User records with Related records without any conditions
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
        ORDER BY a.created DESC
        LIMIT 500
        OFFSET 500
      `,
      {
        type: SELECT,
      },
    );
    const timeRawAfter = Date.now();
    return log(`load multiple records with JOIN without any condition [RAW]: ${
      timeRawAfter - timeRawBefore
    } ms\n`);
  } catch (error) {
    throw error;
  }
};
