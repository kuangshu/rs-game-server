'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const users = await this.ctx.model.User.findAll();
    this.ctx.body = users;
  }
  async user() {}
}

module.exports = HomeController;
