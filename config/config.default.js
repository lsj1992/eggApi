'use strict';
const path = require('path');

function getTime() {
  const nowDate = new Date();
  const y = nowDate.getFullYear();
  let m = nowDate.getMonth();
  m = m >= 9 ? m + 1 : '0' + m;
  let d = nowDate.getDate();
  d = d >= 10 ? d : '0' + d;
  return y + '年' + m + '月' + d + '日';
}
module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1528508714179_2509';

  // add your config here 加载 errorHandler 中间件
  // config.middleware = [ 'errorHandler' ];
  // config.middleware = [ 'checklogin' ];
  // 只对 /api 前缀的 url 路径生效
  // errorHandler: {
  //   match: '/api',
  // };
  // config.checklogin = {
  //   ignore(ctx) {
  //     const ignoreUrl = [
  //       // '/login/login',
  //       // '/login/loginAction',
  //       // '/login/logout',
  //       // '/user/add',
  //       // '/user/addAction',
  //     ];
  //     const URL = ctx.request.url;
  //     return ignoreUrl.some(item => {
  //       return URL === item;
  //     });
  //   },
  // };

  /**
   *
   *  mysql链接配置
   *
   */
  exports.mysql = {
    client: {
      host: '192.168.3.131',
      port: '3306',
      user: 'gzb',
      password: '123456',
      database: 'gzb',
    },
    // client: {
    //   host: 'localhost',
    //   port: '3306',
    //   user: 'root',
    //   password: '123456',
    //   database: 'lsj_db',
    // },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };
  /**
   *  链接redis
   */
  exports.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: '123456',
      db: 0,
    },
  };
  /**
   * 设置jwt密钥
   */
  exports.jwt = {
    secret: 'EGGJSJWTDEMOTEST',
  };
  /**
   * egg-static 静态服务
   */
  exports.static = {
    // maxAge: 31536000,
  };

  /**
   * 日志目录
   */
  exports.logger = {
    appLogName: `${appInfo.name}-web-${getTime()}.log`,
    coreLogName: `${appInfo.name}-egg-web-${getTime()}.log`,
    agentLogName: `${appInfo.name}-egg-agent-${getTime()}.log`,
    errorLogName: `${appInfo.name}-common-error-${getTime()}.log`,
    dir: path.join(__dirname, '../logs/testlogdir/'),
  };
  /**
   * session 默认配置如下
   */
  exports.session = {
    key: 'LSJ_SESSION_KEY',
    maxAge: 24 * 3600 * 1000, // 1 天
    httpOnly: true,
    encrypt: true,
  };
  /**
   * egg-helper 配置
   */
  exports.helper = {

  };
  /**
   * 设置 egg-multipart 上传文件大小限制
   */
  exports.multipart = {
    fileSize: '1mb', // 默认是10mb
    // fileExtensions: [
    //   '.foo',
    //   '.apk',
    // ],
    whitelist: [ // 如果重写whitelist 则fileExtensions将失效
      '.jpg', '.jpeg', // image/jpeg
      '.png', // image/png, image/x-png
      // '.gif', // image/gif
      // '.bmp', // image/bmp
      // '.wbmp', // image/vnd.wap.wbmp
      // '.webp',
      // '.tif',
      // '.psd',
      // // text
      // '.svg',
      // '.js', '.jsx',
      // '.json',
      // '.css', '.less',
      // '.html', '.htm',
      // '.xml',
      // // tar
      // '.zip',
      // '.gz', '.tgz', '.gzip',
      // // video
      // '.mp3',
      // '.mp4',
      // '.avi',
    ],
  };

  /**
   *  跨域配置 使用 egg-cors 插件  需要做以下几项工作
   *  1、 在./plugin.js 中 添加
   *     exports.cors = {
   *         enable: true,
   *        package: 'egg-cors',
   *     };
   *  2、在 config.default.js 中 添加下面代码 config.security = {} 和 config.cors = {}
   *  3、 注意点， config.security.csrf 中 要根据设置x-csrf-token 存储的位置不同而在 前端代码中将其添加到对应的位置。
   *      并且 前端需要配置 上withCredentials: true, 最好也添加上 crossDomain: true, 同时 需要在
   *      config.cors 中添加 credentials: true 还要设置origin 为前端服务ip不能设置为'*' ，后期考虑这里换成一个函数，用来动态设置origin
   *
   */
  exports.security = {
    csp: {
      enable: true,
      ignore: '/api/login/',
      xframe: {
        enable: false,
      },
    },
    csrf: {
      enable: false, // 关闭csrf防范 前后端分离的项目可以关闭
      headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
      ignoreJSON: false, // 不推荐设置为true，因为可能受到攻击，攻击者可以通过flash加image进行攻击
    },
    domainWhiteList: [ 'http://127.0.0.1:9527', 'http://localhost:9527', 'http://127.0.0.1:3000', 'http://localhost:3000', 'http://localhost:4000', 'http://localhost:5000' ], // 设置白名单
  };
  exports.cors = {
    /**
     * origin 这里可以是一个function 如果这里设置了，则会忽略  exports.security.domainWhiteList
     */
    // origin: 'http://localhost:3000',
    /**
    * 客户端请求如果需要保存本地凭条（cookie），则会带有特别的请求字段 withCredentials

    * 服务端需要同样开启这个字段才能响应这些请求

    * 本质上应该是在响应头里增加了这个字段: Access-Control-Allow-Credentials: true

    * 这里应该是全局设置，单独在响应头里加这个字段好像不行。应该是这个框架问题

    */
    credentials: true, // 必须要 和前端配合可以实现再每个请求上自动带上 cookie
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  return config;
};

