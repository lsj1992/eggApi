
'use strict';

const Controller = require('egg').Controller;

const Qs = require('qs');
const svgCaptcha = require('svg-captcha');
// const RestCode = require('../../../helper/resultRestCode');
// const { RestCode, codeStatus } = require('../../../helper/resultRestCode');

class LoginController extends Controller {
  /**
   *  login
   */
  async login() {
    const app = this.app;
    const ctx = this.ctx;
    const RestCode = ctx.helper.resultCode.RestCode;
    const codeStatus = ctx.helper.resultCode.codeStatus;
    console.log('=========================================');
    console.log(codeStatus);
    const params = Object.assign(
      ctx.query,
      ctx.request.body,
      ctx.params
    );
    // ctx.service.posts
    // 调用server中的方法登录
    const results = await ctx.service.user.Login(params);
    // 可以通过 results.affectedRows 判断操作是否成功

    if (results.length > 0) {
      const res = Qs.stringify(results[0]);
      const resJson = Qs.parse(res);
      const token = app.jwt.sign(resJson, app.config.jwt.secret);
      console.log(token);
      resJson.token = token;
      // 存储到session中
      ctx.session.user = JSON.stringify(resJson);
      console.log('=========================================');
      // ctx.body = RestCode.set(resJson, codeStatus.success[0], '登录成功');
      ctx.body = {
        e: '000000',
        d: resJson,
        m: '登录成功',
      };
    } else {
      ctx.body = RestCode.error(codeStatus.noFondData[0], codeStatus.noFondData[1]);
      ctx.redirect('/');
    }
  }

  async islogin(app, ctx, next) {
    const params = Object.assign(
      ctx.query,
      ctx.request.body,
      ctx.params
    );
    const isLogin = await app.service.user.userIsLogin(params);
    if (isLogin) {
      next();
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
