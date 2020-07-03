const exec = require('child_process').exec;
const { promisify } = require('util');

const execPromise = promisify(exec);

/**
 * Create local database if necessary
 * @param {string} name - database name
 * @returns {Promise<*>} 
 */
module.exports = async (name = '') => {
  const {
    stderr: checkError = '',
    stdout = '',
  } = await execPromise(`psql -l | grep ${name} | wc -l`);
  if (checkError) {
    throw checkError;
  }

  // create the database
  if (!stdout || stdout.trim() === '0') {
    const { stderr: createError = '' } = await execPromise(`createdb ${name}`);
    if (createError) {
      throw createError;
    }
    return console.log('-- database: created database');
  }
  return console.log('-- database: database already exists');
};
