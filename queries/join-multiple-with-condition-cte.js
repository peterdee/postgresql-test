// @ts-nocheck
const { QueryTypes } = require('sequelize');

const db = require('../database');
const log = require('../utilities/log');

const { SELECT } = QueryTypes;

/**
 * Get multiple User records with Related records with conditions (use CTE)
 * @returns {Promise<void|Error>}
 */
module.exports = async () => {
  try { 
    // RAW
    const timeRawBefore = Date.now();
    await db.database.query(
      `WITH data AS (
        SELECT * FROM "Users"
        WHERE id >= 50000 AND id::VARCHAR ILIKE '%111%'
        LIMIT 500
        OFFSET 500
      )
      SELECT * FROM "data" a
        LEFT JOIN "Relateds" b
        ON a.id = b."userId"
        ORDER BY a.created DESC
      `,
      {
        type: SELECT,
      },
    );
    const timeRawAfter = Date.now();
    return log(`load multiple records with JOIN with conditions (with CTE) [RAW]: ${
      timeRawAfter - timeRawBefore
    } ms\n`);
  } catch (error) {
    throw error;
  }
};
