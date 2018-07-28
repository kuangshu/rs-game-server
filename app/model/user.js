'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, TINYINT } = app.Sequelize;

  const User = app.model.define(
    'user',
    {
      nick_name: { type: STRING(30), allowNull: false },
      name: { type: STRING(30), allowNull: false },
      open_id: { type: STRING(30), allowNull: false, unique: true },
      age: INTEGER,
      sex: TINYINT,
      phone: { type: STRING(20), unique: true },
      address: { type: STRING(50) },
      last_sign_in_at: { type: DATE, allowNull: false },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );

  // User.associate = function() {
  //   app.model.User.hasOne(app.model.UserInfo);
  // };

  User.findByOpenId = async function(openId) {
    return await this.findOne({
      include: {
        model: app.model.UserInfo,
      },
      where: {
        open_id: { eq: openId },
      },
    });
  };

  // User.sync({ alter: true });

  return User;
};
