const codeStatus = {
  success: [ '10000', '成功' ],
  paramsErr: [ '10001', '参数错误' ],
  noLogin: [ '10002', '没有登录' ],
  noAuth: [ '10003', '没有权限' ],
  noFondData: [ '10004', '没有查到该数据' ],
  apiErr: [ '10005', '服务端接口错误' ],
};


const RestCode = new class {
  constructor() {
    this.response = {
      code: '',
      data: {},
      msg: '',
    };
    this.StatusCode = new Map();
    this.registeStatusCode('10000', '成功');
    this.registeStatusCode('10004', '服务端接口错误');
  }
  registeStatusCode(code, description) {
    this.StatusCode.set(code, description);
  }
  registeStatusCodes(arr) {
    for (const [ code, description ] of arr) {
      this.StatusCode.set(code, description);
    }
  }
  set(data, code = '10000', msg) {
    code = code.toString();
    if (this.StatusCode.has(code)) {
      return {
        code,
        data,
        msg: this.StatusCode.get(code),
      };
    }
    // log Something ,here is an unique code
    return {
      code,
      data,
      msg: msg || 'Unresolvable Status Code :' + code,
    };

  }
  error(code = '10004', msg) {
    code = code.toString();
    if (this.StatusCode.has(code)) {
      return {
        code,
        data: {},
        msg: this.StatusCode.get(code),
      };
    }
    // log Something ,here is an unique code
    return {
      code,
      data: {},
      msg: msg || 'Unresolvable Status Code :' + code,
    };

  }
}();

// registe Status Code

RestCode.registeStatusCodes([
  codeStatus.success,
  codeStatus.paramsErr,
  codeStatus.noLogin,
  codeStatus.noAuth,
  codeStatus.apiErr,
]);


// export default RestCode;

// module.exports = codeStatus;
// module.exports = RestCode;


module.exports = () => {
  return {
    RestCode,
    codeStatus,
  };
};
