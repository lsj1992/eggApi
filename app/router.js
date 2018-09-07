'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
// import cors from('cors')
module.exports = app => {
  const { router, controller } = app;
  // router.use(cors())
  router.get('/', controller.home.index);
  router.get('/home/:info', controller.home.info);
  // router.get('/home/:id', controller.home.info);

  // router.get('/user/:id', controller.user.page);
  // router.post('/admin', isAdmin, controller.admin);
  // router.post('/user', isLoginUser, hasAdminPermission, controller.user.create);
  router.get('/api/list/getList', controller.api.list.list.getList);
  router.post('/api/list/addList', controller.api.list.list.addList);

  // 测试 给两个 前端服务提供接口
  router.post('/api/testPost/testPost', controller.api.testPost.test.testPost);
  router.del('/api/testPost/testDel', controller.api.testPost.test.testDel);
  // 登录
  router.post('/api/login/login', controller.api.login.login.login);
  // 图片验证码
  router.get('/api/login/captcha', controller.api.login.login.captcha);
  // 获取当前用户信息
  router.get('/api/user/info', app.jwt, controller.api.user.index.userInfo);
  // 上传文件 使用 formidable
  router.post('/api/upload/uploadFiles', controller.api.upload.index.uploadFiles);
  // 上传文件 使用 egg-multipart
  router.post('/api/upload/uploads', controller.api.upload.index.uploads);
  // logApi 下的 weblogs
  router.post('/logApi/index/webLogs', controller.logApi.index.webLogs);
  // 测试工之保登录
  router.post('/crm/user/login', controller.api.login.login.login);
};
