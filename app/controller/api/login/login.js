
'use strict';

const Controller = require('egg').Controller;

class LoginController extends Controller {
  /**
   *  获取所有男性用户
   */
  async login() {
    const app = this.app
    const ctx = this.ctx
    const params = Object.assign(this.ctx.query, this.ctx.request.body, this.ctx.params)
    const results = await app.mysql.select('user', {
      where: { name: params.name}
    });
    // ctx.body = results
    if (results[0].pwd == params.pwd) {
      console.log('jiiihihi')
      await app.redis.set(`${results[0].id}_token`, `${results[0].id} + "_token"`);
    }
    ctx.body = await app.redis.get(`${results[0].id}_token`);
    // this.ctx.body = results
  }
  /**
   *  添加新用户
   */
  async loginOut() {
    const params = Object.assign(this.ctx.query, this.ctx.request.body, this.ctx.params)
    const results = await this.app.mysql.insert('user', {
      name: params.name,
      sex: params.sex ? params.sex : '男',
      age: params.age ? params.age : 0,
      pwd: params.pwd ? params.pwd : ''
    });
    this.ctx.body = results
  }
}

module.exports = LoginController;
