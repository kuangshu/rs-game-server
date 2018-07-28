'use strict';

module.exports = app => {
  const { STRING, BOOLEAN } = app.Sequelize;

  const Question = app.model.define(
    'question',
    {
      stem: { type: STRING(50), allowNull: false, comment: '题干' },
      type: {
        type: STRING(10),
        allowNull: false,
        comment: '题目类型： 1、单选 2、多选 ',
      },
      isDelete: { type: BOOLEAN, allowNull: false, defaultValue: false },

    },
    {
      timestamps: true,
      freezeTableName: true,
    }
  );

  // Question.associate = function() {
  //   app.model.Question.hasMany(app.model.QuestionOptions, { as: 'option' });
  // };

  Question.add = async function(entity) {
    return await this.create(entity);
  };

  Question.findByLogin = async function(login) {
    return await this.findOne({
      where: {
        login,
      },
    });
  };

  Question.prototype.logSignin = async function() {
    await this.update({ last_sign_in_at: new Date() });
  };

  // Question.sync({ alter: true });

  return Question;
};
