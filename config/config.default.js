'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1528508714179_2509';

  // add your config here
  config.middleware = [];

  /**
   * 
   *  mysql链接配置
   *
   */
  config.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: '123456',
      database: 'lsj_db',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };
  /**
   *  链接redis
   */
  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: '123456',
      db: 0,
    },
  }

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
  config.security = {
    csrf: {
      headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
    },
    // domainWhiteList: ['http://localhost:3000', 'http://localhost:4000']
  };
  config.cors = {
    // origin: ['http://localhost:3000', 'http://localhost:4000'],
    origin: 'http://localhost:3000',//必须要 这里可以是一个function
    /**
    * 客户端请求如果需要保存本地凭条（cookie），则会带有特别的请求字段 withCredentials

    * 服务端需要同样开启这个字段才能响应这些请求

    * 本质上应该是在响应头里增加了这个字段: Access-Control-Allow-Credentials: true

    * 这里应该是全局设置，单独在响应头里加这个字段好像不行。应该是这个框架问题

    */
    credentials: true,// 必须要
    // allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    domainWhiteList: ['http://localhost:3000', 'http://localhost:4000']
  };

  return config;
};

