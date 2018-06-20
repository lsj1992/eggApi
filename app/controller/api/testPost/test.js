'use strict';

const Controller = require('egg').Controller;

class testController extends Controller {
  /**
   *  test 测试跨域post请求
   */
  async testPost() {
    const params = Object.assign(this.ctx.query, this.ctx.request.body, this.ctx.params);
    const results = {
      name: params.name,
      sex: params.sex ? params.sex : '男',
      age: params.age ? params.age : 0,
      pwd: params.pwd ? params.pwd : '',
    };
    this.ctx.body = results;
  }

  async testDel() {
    const params = Object.assign(this.ctx.query, this.ctx.request.body, this.ctx.params);
    const results = {
      name: params.name,
      sex: params.sex ? params.sex : '男',
      age: params.age ? params.age : 0,
      pwd: params.pwd ? params.pwd : '',
    };
    this.ctx.body = results;
  }

}

module.exports = testController;
