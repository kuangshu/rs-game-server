module.exports = app => {
  const { STRING, INTEGER, DATE, TINYINT } = app.Sequelize;

  const User = app.model.define('user', {
    nick_name: STRING(30),
    name: STRING(30),
    password: STRING(32),
    open_id: STRING(30),
    age: INTEGER,
    sex: TINYINT,
    gold: { type: STRING(30), allowNull: false, defaultValue: '100' },
    score: { type: STRING(30), allowNull: false, defaultValue: '0' },
    last_sign_in_at: { type: DATE, allowNull: false },
    created_at: { type: DATE, allowNull: false },
    updated_at: { type: DATE, allowNull: false },
  });

  User.findByLogin = function*(login) {
    return yield this.findOne({
      where: {
        login: login,
      },
    });
  };

  User.prototype.logSignin = function*() {
    yield this.update({ last_sign_in_at: new Date() });
  };

  // User.sync({ alter: true });

  return User;
};
