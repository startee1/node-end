'use strict'

const BaseComponent = require('../../basicApi/baseComponent')
const AdminDB = require('../../db/admin/admin')
const RandomUsername = require('../../utils/randomUsername')

class Admin extends BaseComponent {
  constructor () {
    super()
  }
  // POST
  login = async (req, res, next) => {
    let {username, password} = req.body
    const ip = req.ip
    try{
      if (!username) {
        throw new Error('用户名错误')
      }else if(!password){
        throw new Error('密码错误')
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'GET_ERROR_PARAM',
        message: err.message,
      })
      return
    }
    try{
      let pwd = this.encryptPwd(password)
      let checkInfo = await AdminDB.login(username, pwd)
      console.log(pwd,checkInfo,'other')
      if (checkInfo) {
        let token = this.encryptToken([checkInfo.username,checkInfo.power,pwd,ip],'en')
        checkInfo.token = token || ''
        res.send({
          status: 1,
          type: 'Login_Success',
          success: '登录成功',
          data: checkInfo
        })
      }else{
        res.send({
          status: 0,
          type: 'Login_Info_Error',
          message: '用户名或密码错误'
        })
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'Login_Error',
        message: '用户登录失败',
        err: err.message
      })
    }
  }
  // POST
  register = async (req, res, next) => {
    let {username, password, power = 1} = req.body
    try{
      if (!username) {
        throw new Error('用户名错误')
      }else if(!password){
        throw new Error('密码错误')
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'GET_ERROR_PARAM',
        message: err.message,
      })
      return
    }
    try{
      let isExistUsername = await AdminDB.checkUsernameExist(username)
      if (isExistUsername) {
        res.send({
          status: 0,
          type: 'Exist_Username',
          message: '用户名称已存在',
        })
        return
      }else{
        power = power == 1 ? '管理员':'商铺'
        let pwd = this.encryptPwd(password)
        let registerStatus = AdminDB.register(username,pwd, power)
        if (registerStatus) {
          res.send({
            status: 1,
            type: 'Register_Success',
            message: '用户注册成功'
          })
        }
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'Register_Fail',
        message: '注册失败',
        err: err.message
      })
    }
  }
  // POST 
  registerShop = async (req, res, next) => {
    let username = RandomUsername(10)
    while (await AdminDB.checkUsernameExist(username)) {
      username = RandomUsername()
    }
    let password = '111111'
    let power = '商铺'
    let pwd = this.encryptPwd(password)
    let registerStatus = AdminDB.register(username, pwd, power)
    if (registerStatus) {
      res.send({
        status: 1,
        type: 'RegisterShop_Success',
        message: '添加商铺成功',
        data: {
          username,
          password
        }
      })
    }
  } 
  async logoff (req, res, next) {
    
  }
  
  async updatePwd (req, res, next) {

  }
}

module.exports = new Admin()