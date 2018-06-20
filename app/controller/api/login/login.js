
'use strict';

const Controller = require('egg').Controller;

const Qs = require('qs');

class LoginController extends Controller {
  /**
   *  login
   */
  async login() {
    const app = this.app;
    const ctx = this.ctx;
    const params = Object.assign(
      this.ctx.query,
      this.ctx.request.body,
      this.ctx.params
    );
    const results = await app.mysql.select('user', {
      where: {
        name: params.name,
        pwd: params.pwd,
      },
    });
    console.log(Qs.stringify(results[0]));
    // ctx.body = results;
    if (results.length > 0) {
      await app.redis.set(
        `${results[0].id}_token`,
        Qs.stringify(results[0]),
        5
      );
      const str = await app.redis.get(`${results[0].id}_token`);
      console.log(str);
      ctx.body = await Qs.parse(str);
      // ctx.redirect('/');
    } else {
      ctx.body = '用户名或者密码错误';
      ctx.redirect('/');
    }
  }

  async islogin() {
    const app = this.app;
    const ctx = this.ctx;
    const params = Object.assign(
      this.ctx.query,
      this.ctx.request.body,
      this.ctx.params
    );
    const isLogin = await app.redis.get(`${params.id}_token`);
    if (isLogin) {
      const results = await app.mysql.select('user', {
        where: {
          id: params.id,
        },
      });
      if (results.length > 0) {
        ctx.body = await Qs.parse(results);
      } else {
        ctx.redirect('/');
      }
    } else {
      ctx.redirect('/');
    }
  }
  /**
   *  添加新用户
   */
  async loginOut() {
    const params = Object.assign(
      this.ctx.query,
      this.ctx.request.body,
      this.ctx.params
    );
    const results = await this.app.mysql.insert('user', {
      name: params.name,
      sex: params.sex ? params.sex : '男',
      age: params.age ? params.age : 0,
      pwd: params.pwd ? params.pwd : '',
    });
    this.ctx.body = results;
  }
}

module.exports = LoginController;
