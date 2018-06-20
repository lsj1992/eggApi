'use strict';

// had enabled by egg
// exports.static = true;
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
// egg-mysql 简单实用
// https://www.ruphi.cn/archives/298/
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};
/**
 *  启用redis
 */
exports.redis = {
  enable: true,
  package: 'egg-redis',
};
