const mysql  = require('../basicApi/mysql.js')
const BaseComponent = require('../basicApi/baseComponent')


class Check extends BaseComponent{
  constructor () {
    super()
  }
  // POST
  checkSuperAdmin = async (req, res, next) => {
    let {token} = req.headers
    let userInfo = {
      username: '',
      pwd: ''
    }
    try{
      if (token) {
        userInfo.username = this.decryptToken(token).split('&')[0]
        userInfo.pwd = this.decryptToken(token).split('&')[2]
      }else {
        throw new Error('token错误')
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'ERROR_PARAMS_REQUEST',
        err: err.message
      })
      return
    }
    try{
      let user = await mysql.select('user', ['power'], ` username = '${userInfo.username}' and pwd = '${userInfo.pwd}' and bin = 1 order by pubdate desc`)
      if (user.length > 0 && user[0].power === '超级管理员') {
        next()
      }else {
        res.send({
          status: 0,
          type: 'POWER_NOT_ABLE',
          err: '权限不足'
        })
        return
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'ERROR_REQUEST',
        err: err.message,
        err: '权限识别失败',
      })
    }
  }
  // POST
  checkAdmin = async (req, res, next) => {
    let {token} = req.headers
    let userInfo = {
      username: '',
      pwd: ''
    }
    try{
      if (token) {
        userInfo.username = this.decryptToken(token).split('&')[0]
        userInfo.pwd = this.decryptToken(token).split('&')[2]
      }else {
        throw new Error('token错误')
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'ERROR_PARAMS_REQUEST',
        err: err.message
      })
      return
    }
    try{
      let user = await mysql.select('user', ['power'], ` username = '${userInfo.username}' and pwd = '${userInfo.pwd}' and bin = 1 order by pubdate desc`)
      if (user.length > 0 && (user[0].power === '管理员' || user[0].power === '超级管理员')) {
        next()
      }else {
        res.send({
          status: 0,
          type: 'POWER_NOT_ABLE',
          err: '权限不足'
        })
        return
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'ERROR_REQUEST',
        err: err.message,
        err: '权限识别失败',
      })
    }
  }
  // POST
  checkShop = async (req, res, next) => {
    let {token} = req.headers
    let userInfo = {
      username: '',
      pwd: ''
    }
    try{
      if (token) {
        userInfo.username = this.decryptToken(token).split('&')[0]
        userInfo.pwd = this.decryptToken(token).split('&')[2]
      }else {
        throw new Error('token错误')
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'ERROR_PARAMS_REQUEST',
        err: err.message 
      })
      return
    }
    try{
      let user = await mysql.select('user', ['power'], ` username = '${userInfo.username}' and pwd = '${userInfo.pwd}' and bin = 1 order by pubdate desc`)
      if (user.length > 0 && (user[0].power === '商铺' || user[0].power === '超级管理员')) {
        next()
      }else {
        res.send({
          status: 0,
          type: 'POWER_NOT_ABLE',
          err: '权限不足'
        })
        return
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'ERROR_REQUEST',
        err: err.message,
        err: '权限识别失败',
      })
    }
  }
}

module.exports = new Check()