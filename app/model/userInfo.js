'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TINYINT } = app.Sequelize;

  const UserInfo = app.model.define(
    'userinfo',
    {
      gold: { type: STRING(30), allowNull: false, defaultValue: '100' },
      score: { type: STRING(30), allowNull: false, defaultValue: '0' },
      keepLoginDay: { type: STRING(5), allowNull: false, defaultValue: '0' },
      mession: { type: STRING(5), allowNull: false, defaultValue: '1' },
      user_id: { type: STRING(30), allowNull: false },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );

  // UserInfo.sync({ alter: true });

  return UserInfo;
};
