'use strict';

const Controller = require('egg').Controller;

class testController extends Controller {
  /**
   *  添加新用户
   */
  async test() {
    const params = Object.assign(this.ctx.query, this.ctx.request.body, this.ctx.params)
    // const results = await this.app.mysql.insert('user', {
    //   name: params.name,
    //   sex: params.sex ? params.sex : '男',
    //   age: params.age ? params.age : 0,
    //   pwd: params.pwd ? params.pwd : ''
    // });
    this.ctx.body = {
      name: params.name
    }
  }
}

module.exports = testController;
