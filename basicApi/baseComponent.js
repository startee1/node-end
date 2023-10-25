const crypto = require('crypto')
const { CRYPTO_IV,CRYPTO_PASSWORD_SALT,CRYPTO_PASSWORD_KEY } = require('../config/index')

module.exports =  class BaseComponent {
  constructor () {
    this.encryptPwd = this.encryptPwd.bind(this)
    this.encryptToken = this.encryptToken.bind(this)
    this.decryptToken = this.decryptToken.bind(this)
  }
  async uploadImg () {}
  // Token 加密返回
  encryptToken (pwd,type) {
    pwd = pwd.join('&')
    const key = crypto.scryptSync("123123123", "salt", 24);
    const cipher = crypto.createCipheriv("aes-192-cbc", key, CRYPTO_IV);
    let encrypted = cipher.update(pwd, "utf8", "hex");
    encrypted += cipher.final("hex");
    return encrypted
  }
  // Token 解密返回
  decryptToken (encrypted) {
    const key = crypto.scryptSync("123123123", "salt", 24);
    const decipher = crypto.createDecipheriv("aes-192-cbc", key, CRYPTO_IV);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted
  }
  // 数据库密码加密
  encryptPwd (pwd) {
    pwd += CRYPTO_PASSWORD_SALT
    const md5 = crypto.createHash('md5', CRYPTO_PASSWORD_KEY);
    const hash = md5.update(pwd);
    const result = hash.digest('hex');
    return result;
  }
}