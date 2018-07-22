'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, BOOLEAN } = app.Sequelize;

  const QuestionOptions = app.model.define(
    'question_options',
    {
      questionId: { type: STRING(30), allowNull: false, comment: '题目id' },
      contents: { type: STRING(50), allowNull: false, comment: '选项内容' },
      contentType: {
        type: STRING(10),
        allowNull: false,
        comment: '选项类型： 1、文本 2、图片 ',
      },
      isCorrect: { type: BOOLEAN, allowNull: false, comment: '是否是正确答案' },
    },
    {
      timestamps: true,
    }
  );

  QuestionOptions.associate = function() {
    app.model.QuestionOptions.belongsTo(app.model.Question, { as: 'Question' });
  };

  QuestionOptions.add = async function(entity) {
    return await this.create(entity);
  };

  QuestionOptions.findByLogin = async function(login) {
    return await this.findOne({
      where: {
        login,
      },
    });
  };

  QuestionOptions.prototype.logSignin = async function() {
    await this.update({ last_sign_in_at: new Date() });
  };

  // Question.sync({ alter: true });

  return QuestionOptions;
};
