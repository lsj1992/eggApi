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
  enable: false,
  package: 'egg-redis',
};
/**
 *  启用 egg-jwt用来做权限认证
 */
exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};
/**
 * 启用egg-helper
 */
exports.helper = {
  enable: true,
  package: 'egg-helper',
};
