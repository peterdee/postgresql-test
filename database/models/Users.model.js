// @ts-nocheck
module.exports = (
  Sequelize,
  {
    BOOLEAN,
    INTEGER,
    STRING,
  },
) => Sequelize.define('Users', {
  isDeleted: {
    defaultValue: false,
    type: BOOLEAN,
  },
  created: {
    type: INTEGER,
  },
  updated: {
    type: INTEGER,
  },
  entity: {
    defaultValue: 'Users',
    type: STRING,
  },
});
