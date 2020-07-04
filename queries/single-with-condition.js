// @ts-nocheck
const {
  cast,
  col,
  QueryTypes,
  where,
} = require('sequelize');

const db = require('../database');
const log = require('../utilities/log');

const { SELECT } = QueryTypes;

/**
 * Get a single User record with conditions
 * @returns {Promise<void|Error>}
 */
module.exports = async () => {
  try {
    // use Sequelize
    const timeBefore = Date.now();
    await db.Users.findOne({
      raw: true,
      where: {
        id: {
          [db.Op.and]: [
            {
              [db.Op.gte]: 50000,
            },
            where(
              cast(col('id'), 'VARCHAR'),
              {
                [db.Op.iLike]: `%111%`,
              },
            ),
          ],
        },
      }
    });
    const timeAfter = Date.now();
    log(`load single record with conditions: ${timeAfter - timeBefore} ms`);
    
    // RAW
    const timeRawBefore = Date.now();
    await db.database.query(
      `SELECT * FROM "Users" WHERE id >= 50000 AND id::VARCHAR ILIKE '%111%' LIMIT 1`,
      {
        type: SELECT,
      },
    );
    const timeRawAfter = Date.now();
    return log(`load single record with conditions [RAW]: ${
      timeRawAfter - timeRawBefore
    } ms\n`);
  } catch (error) {
    throw error;
  }
};
