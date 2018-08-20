
'use strict';

const Controller = require('egg').Controller;


class ErrorController extends Controller {
  /**
   *  errorLogs
   */
  async webLogs() {
    const ctx = this.ctx;
    const logger = this.logger;
    const params = Object.assign(
      ctx.query,
      ctx.request.body,
      ctx.params
    );
    logger.error(params);
    ctx.body = {
      message: '添加日志成功',
      status: 100001,
      data: '',
    };
    await ctx.body;
  }
}

module.exports = ErrorController;
