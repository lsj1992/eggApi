'use strict';

const fs = require('fs');
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const formidable = require('formidable');
// const Controller = require('../../core/base_controller');
const Controller = require('egg').Controller;

class FileController extends Controller {
  async parse(req) {
    const form = new formidable.IncomingForm();
    // form.uploadDir = path.join(this.config.baseDir, 'app/public/upload');
    return new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
        }
        resolve({ fields, files });
      });
    });
  }

  /**
 * 上传文件，兼容单文件和多文件
 *  customName 单文件自定义文件名
 *  isAjax 上传方式
 */
  async uploadFiles() {
    const { ctx, logger } = this;
    const extraParams = await this.parse(ctx.req);
    const { multipleFile, customName } = extraParams && extraParams.fields;
    logger.info(multipleFile, customName);
    const urls = [];
    console.log('----------------------');
    console.log('----------------------');
    for (const key in extraParams.files) {
      const file = extraParams.files[key];
      logger.info('file.name', file.name);
      logger.info('customName', customName);
      const stream = fs.createReadStream(file.path);
      const fileName = customName ? (customName + path.extname(file.name)) : file.name;
      const target = path.join(this.config.baseDir, 'app/public/upload', fileName);
      const writeStream = fs.createWriteStream(target);
      try {
        await awaitWriteStream(stream.pipe(writeStream));
      } catch (err) {
        await sendToWormhole(stream);
        throw err;
      }
      urls.push(target);
    }
    // this.success({ urls });
    ctx.body = {
      msg: '上传成功',
      data: { urls },
    };
  }
  /**
   * 使用mutation进行处理
   */
  async uploads() {
    const ctx = this.ctx;
    const parts = ctx.multipart({ autoFields: true });
    let part;
    const files = [];
    let fields;
    while ((part = await parts()) != null) {
      if (part.length) {
        // arrays are busboy fields
        console.log('field: ' + part[0]);
        console.log('value: ' + part[1]);
        console.log('valueTruncated: ' + part[2]);
        console.log('fieldnameTruncated: ' + part[3]);

        ctx.body = {
          msg: '上传成功',
          data: {
            field: part[0],
            value: part[1],
            valueTruncated: part[2],
            fieldnameTruncated: part[3],
          },
        };
      } else {
        if (!part.filename) {
          // user click `upload` before choose a file,
          // `part` will be file stream, but `part.filename` is empty
          // must handler this, such as log error.
          ctx.body = {
            msg: '没有part.fileName',
            data: { },
          };
          return;
        }

        // otherwise, it's a stream
        console.log('field: ' + part.fieldname);
        console.log('filename: ' + part.filename);
        console.log('encoding: ' + part.encoding);
        console.log('mime: ' + part.mime);
        // let result;
        try {
          files.push(part);
          await sendToWormhole(part);
          fields = parts.field;
          // await awaitWriteStream(stream.pipe(writeStream));
          // await awaitWriteStream(part);
          // result = await ctx.oss.put('egg-multipart-test/' + part.filename, part);
        } catch (err) {
          // await sendToWormhole(part);
          throw err;
        }
        // return [ files, fields ];
        // console.log(result);
        ctx.body = {
          msg: '上传成功',
          data: [ files, fields, 'yes success' ],
        };
      }
    }
    console.log('and we are done parsing the form!');
    ctx.body = {
      msg: '上传成功',
      data: [ 'my god not really success', part ],
    };
  }
}

module.exports = FileController;
