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
  router.post('/api/testPost/test', controller.api.testPost.test.test)
};
