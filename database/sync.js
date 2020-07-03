// @ts-nocheck
const createDatabase = require('./create-database');
const db = require('./index');
const { database: name } = require('../config');
const seeding = require('./seed');

/**
 * Sync the database
 */
(async function sync() {
  try {
    await createDatabase(name);
    let record = null;

    try {
      record = await db.Users.findOne({});
    } catch (error) {
      const {
        message = '',
        name = '',
      } = error;
      if (message && message === 'relation "Users" does not exist'
        && name && name === 'SequelizeDatabaseError') {
        await db.database.sync({ force: true });

        console.log('-- database: syncing is done');
      } else {
        throw error;
      }
    }

    if (!record) {
      await seeding(db);
    }

    console.log('-- database: ready');
    return process.exit(0);
  } catch (error) {
    throw error;
  }
})();
