'use strict';

const Controller = require('egg').Controller;


class HomeController extends Controller {
  async index() {
    let queryString = '';
    // 合并多有参数 到params中
    const params = Object.assign(this.ctx.query, this.ctx.request.body, this.ctx.params);
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const element = params[key];
        queryString += `"${key}" = "${element}"&`;
      }
    }
    this.ctx.body = `hello egg, ${queryString.slice(0, -1)}`;
  }
  async info() {
    const params = Object.assign(this.ctx.query, this.ctx.request.body, this.ctx.params);
    const user = this.mysql.get('users', { id: 1 });
    const results = this.mysql.select('users', {
      where: { id: 1 },
      orders: [[ 'id', 'desc' ]],
      limit: 10,
      offset: 0,
    });
    console.log(user);
    console.log(results);
    this.ctx.body = `nihao ${params.info}`;
  }
}

module.exports = HomeController;
