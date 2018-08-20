
'use strict';

const Controller = require('egg').Controller;

const Qs = require('qs');
const svgCaptcha = require('svg-captcha');

class UserController extends Controller {
  /**
   *  login
   */
  async userInfo() {
    const app = this.app;
    const ctx = this.ctx;
    const params = Object.assign(
      ctx.query,
      ctx.request.body,
      ctx.params
    );
    const results = await app.mysql.select('users', {
      where: {
        id: params.id,
      },
      columns: [ 'id', 'name', 'age' ],
    });
    if (results.length > 0) {
      const res = Qs.stringify(results[0]);
      const resJson = Qs.parse(res);
      ctx.body = {
        message: '获取用户信息成功',
        data: resJson,
        code: 100001,
      };
    } else {
      ctx.body = {
        message: '获取用户信息失败',
        data: {},
        code: 100001,
      };
    }
  }
}

module.exports = UserController;
