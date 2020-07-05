// @ts-nocheck
const { v4 } = require('uuid');

const usersAmount = Number(process.env.RECORDS) || 100000;

/**
 * Numbers generator
 * @param {number} amount - amount of elements to generate
 * @returns {number}
 */
function* generate(amount = 100) {
  let current = 1;

  while (current < amount) {
    yield current += 1;
  }
}

/**
 * Database seeding
 * @param {object} db - database connection
 * @returns {Promise<*>}
 */
module.exports = async (db) => {
  try {
    const list = [...generate(usersAmount)];

    for await (let i of list) {
      const seconds = Math.floor(Date.now() / 1000);
      const user = db.Users.create({
        created: seconds,
        updated: seconds,      
      });
      await db.Related.create({
        userId: user.id,
        unique: v4(),
        created: seconds,
        updated: seconds,
      });

      // create additional 5 records for every 10th element
      if (`${user.id}`.slice(-1) === '0') {
        await Promise.all([...generate(5)].map(() => db.Related.create({
          userId: user.id,
          unique: v4(),
          created: seconds,
          updated: seconds,
        })));
      }
    }
    
    return console.log('-- database: seeding is done');
  } catch (error) {
    throw error;
  }
};
