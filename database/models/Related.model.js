// @ts-nocheck
module.exports = (
  Sequelize,
  {
    BOOLEAN,
    INTEGER,
    STRING,
  },
) => Sequelize.define('Related', {
  userId: {
    type: INTEGER,
  },
  unique: {
    type: STRING,
  },
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
    defaultValue: 'Related',
    type: STRING,
  },
});
