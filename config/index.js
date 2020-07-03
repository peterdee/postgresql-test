const { env = {} } = process;

module.exports = {
  database: env.DB_DATABASE,
  dialect: 'postgres',
  host: env.DB_HOST,
  logging: false,
  password: env.DB_PASSWORD,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
};
