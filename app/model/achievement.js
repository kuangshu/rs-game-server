'use strict';

module.exports = app => {
  const { STRING, BOOLEAN } = app.Sequelize;

  const Achievement = app.model.define(
    'achievement',
    {
      name: { type: STRING(30), allowNull: false, commit: '' },
      description: { type: STRING(200), allowNull: false },
      target: { type: STRING(30), allowNull: false },
      reward: { type: STRING(20), allowNull: false },
      mession_type: {
        type: STRING(10),
        values: [ 'daily', 'general' ],
      },
      isDelete: { type: BOOLEAN, allowNull: false, defaultValue: false },
    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );

  Achievement.findByOpenId = async function(openId) {
    return await this.findOne({
      include: {
        model: app.model.UserInfo,
      },
      where: {
        open_id: { eq: openId },
      },
    });
  };

  // Achievement.sync({ alter: true });

  return Achievement;
};
