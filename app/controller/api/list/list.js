'use strict';

const Controller = require('egg').Controller;

class ListController extends Controller {
  /**
   *  获取所有男性用户
   */
  async getList() {
    // const params = Object.assign(this.ctx.query, this.ctx.request.body, this.ctx.params)
    // const user = await this.app.mysql.get('user', { id: 1 });
    const results = await this.app.mysql.select('user', {
      where: {
        sex: '男',
      },
      orders: [[ 'id', 'desc' ]],
      limit: 10,
      offset: 0,
    });
    this.ctx.body = results;
  }
  /**
   *  添加新用户
   */
  async addList() {
    const params = Object.assign(this.ctx.query, this.ctx.request.body, this.ctx.params);
    const results = await this.app.mysql.insert('user', {
      name: params.name,
      sex: params.sex ? params.sex : '男',
      age: params.age ? params.age : 0,
      pwd: params.pwd ? params.pwd : '',
    });
    this.ctx.body = results;
  }
}

module.exports = ListController;
