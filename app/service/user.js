const Service = require('egg').Service;

class UserService extends Service {
  async find(uid) {
    const user = await this.ctx.db.query('select * from user where uid = ?', uid);
    return user;
  }
  async add(userData) {
    const result = await this.ctx.model.User.create(userData);
  }
}

module.exports = UserService;
