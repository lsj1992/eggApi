
'use strict';

const Controller = require('egg').Controller;

const Qs = require('qs');
const svgCaptcha = require('svg-captcha');

class LoginController extends Controller {
  /**
   *  login
   */
  async login() {
    const app = this.app;
    const ctx = this.ctx;
    const params = Object.assign(
      ctx.query,
      ctx.request.body,
      ctx.params
    );
    const results = await app.mysql.select('users', {
      where: {
        name: params.name,
        password: params.password,
      },
      columns: [ 'id', 'name' ],
    });
    if (results.length > 0) {
      const res = Qs.stringify(results[0]);
      const resJson = Qs.parse(res);
      const token = app.jwt.sign(resJson, app.config.jwt.secret);
      console.log(token);
      resJson.token = token;
      // await app.redis.set(
      //   `${results[0].id}_token`,
      //   Qs.stringify(results[0]),
      //   5
      // );
      // const str = await app.redis.get(`${results[0].id}_token`);
      // console.log(str);
      // ctx.body = await Qs.parse(str);
      // ctx.body = token;
      ctx.body = {
        message: '登录成功！',
        data: resJson,
        code: 100001,
      };
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
  // 生成图片验证吗
  captcha() {
    const data = svgCaptcha.create();
    if (data) {
      this.ctx.status = 201;
      this.ctx.body = {
        status: 100001,
        message: '获取验证码成功',
        data,
      };
    } else {
      this.ctx.body = {
        status: 100001,
        message: '获取验证码失败，请重试！',
        data,
      };
    }
    return;
  }
}

module.exports = LoginController;
