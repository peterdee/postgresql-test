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
 * Get multiple User records with conditions
 * @returns {Promise<void|Error>}
 */
module.exports = async () => {
  try {
    // use Sequelize
    const timeBefore = Date.now();
    const seq = await db.Users.findAll({
      limit: 500,
      order: [['created', 'DESC']],
      offset: 500,
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
    log(`load multiple records with conditions: ${
      timeAfter - timeBefore
    } ms, found ${seq.length} results`);
    
    // RAW
    const timeRawBefore = Date.now();
    const raw = await db.database.query(
      `SELECT * FROM "Users"
        WHERE id >= 50000 AND id::VARCHAR ILIKE '%111%'
        ORDER BY created DESC
        LIMIT 500
        OFFSET 500
      `,
      {
        type: SELECT,
      },
    );
    const timeRawAfter = Date.now();
    return log(`load multiple records with conditions [RAW]: ${
      timeRawAfter - timeRawBefore
    } ms, found ${raw.length} results\n`);
  } catch (error) {
    throw error;
  }
};
