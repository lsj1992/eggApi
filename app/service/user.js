const { Service } = require('egg');
// const md5 = require('md5');
class UserService extends Service {
  async userIsLogin(uid, token) {
    if (uid == null || token == null) {
      return false;
    }
    const user = await this.ctx.db.query('SELECT * FROM users WHERE uid = ?', uid);
    return user;
  }
  async Login(params) {
    const app = this.app;
    console.log(params);
    // const pwd = md5(params.password);
    // if (params.name == null || pwd == null) {
    //   return false;
    // }
    const user = app.mysql.select('gzb01_t_user', {
      where: {
        phone: params.phone,
        password: params.password,
      },
      columns: [ 'id', 'phone' ],
    });
    return user;
  }
}
module.exports = UserService;
