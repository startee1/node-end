const BaseComponent = require('../../basicApi/baseComponent')
const UserDB = require('../../db/user/user')

class User extends BaseComponent {
  constructor () {
    super()
  }
  // GET
  list = async (req, res, next) => {
    let {page} = req.query
    try{
      if (!page) {
        throw new Error('页码不存在')
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
      page--
      let userList = await UserDB.list(page*10);
      for (let i = 0; i < userList.length; i++) {
        let hideUsername = `${userList[i].username.slice(0,3)}****${userList[i].username.slice(-3)}`
        userList[i].username = hideUsername
      }
      if (userList) {
        res.send({
          status: 1,
          type: 'GET_USERLIST_SUCCESS',
          message: '获取用户列表成功',
          data: userList
        })
      }else{
        res.send({
          status: 0,
          type: 'EMPTY_USER',
          message: '用户列表为空'
        })
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'GET_USERLIST_FAIL',
        message: '获取用户列表失败',
        err: err.message
      })
    }
  }
  // POST
  delete = async (req, res, next) => {
    let {id} = req.body
    try{
      if (!id) {
        throw new Error('请求错误')
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
      let userDelete = await UserDB.delete(id);
      if (userDelete) {
        res.send({
          status: 1,
          type: 'DELETE_USER_SUCCESS',
          message: '删除用户成功',
        })
      }else{
        res.send({
          status: 0,
          type: 'EMPTY_USER',
          message: '删除用户不存在'
        })
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'DELETE_USER_FAIL',
        message: '删除用户失败',
        err: err.message
      })
    }
  }
  // GET
  count = async (req, res, next) => {
    try{
      let count = await UserDB.count();
      if (count) {
        res.send({
          status: 1,
          type: 'GET_USERCOUNT_SUCCESS',
          message: '获取用户总数成功',
          data: count
        })
      }else{
        res.send({
          status: 0,
          type: 'EMPTY_USERCOUNT',
          message: '用户总数为0'
        })
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'GET_USERCOUNT_FAIL',
        message: '获取用户总数失败',
        err: err.message
      })
    }
  }
  // POST
  password = async (req, res, next) => {
    let {id, username, beforePassword, afterPassword} = req.body
    try{
      if (!username || !beforePassword || !afterPassword) {
        throw new Error('参数错误')
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'GET_PARAMS_ERROR',
        err: err.message
      })
      return
    }
    try{
      beforePassword = this.encryptPwd(beforePassword)
      let check = await UserDB.checkPassword(username, beforePassword)
      if (check) {
        afterPassword = this.encryptPwd(afterPassword)
        let update_statuc = await UserDB.updatePassword(id, username, afterPassword)
        if (update_statuc) {
          res.send({
            status: 1,
            type: 'UPDATE_PASSWORD_SUCCESS',
            data: {
              message: '更新密码成功'
            }
          })
        }else{
          res.send({
            status: 1,
            type: 'UPDATE_PASSWORD_FAIL',
            message: '更新失败'
          })
        }
      }else{
        res.send({
          status: 0,
          type: 'PASSWORD_WRONG',
          message: '密码错误'
        })
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'UPDATE_PASSWORD_ERROR',
        err: err.message
      })
    }
  }
}

module.exports = new User()