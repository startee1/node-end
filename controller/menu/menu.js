const BaseComponent = require('../../basicApi/baseComponent')
const MenuDB = require('../../db/menu/menu')

class Menu extends BaseComponent {
  constructor () {
    super()
  }
  // GET
  list = async (req, res, next) => {
    let {shopid} = req.query
    try{
      if(!shopid){
        throw new Error('请求参数错误')
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'REQUEST_PARAMS_ERROR',
        err: err.message
      })
      return
    }
    try{
      let type = await MenuDB.list(shopid)
      if (type) {
        res.send({
          status: 1,
          type: 'GET_TYPE_SUCCESS',
          data: type
        })
      }else{
        res.send({
          status: 0,
          type: 'GET_TYPE_EMPTY',
          message: '获取内容为空'
        })
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'GET_TYPE_ERROT',
        err: '获取分类列表失败'
      })
    }
  }
  // POST
  add = async (req, res, next) => {
    let {name, shopid = 0} = req.body
    try{
      if(!name || !shopid){
        throw new Error('请求参数错误')
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'REQUEST_PARAMS_ERROR',
        err: err.message
      })
      return
    }
    try{
      let type = await MenuDB.add(name, shopid)
      if (type) {
        res.send({
          status: 1,
          type: 'ADD_TYPE_SUCCESS',
          data: type
        })
      }else{
        res.send({
          status: 0,
          type: 'ADD_TYPE_EMPTY',
          message: '添加分类异常'
        })
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'ADD_TYPE_ERROT',
        err: '增加分类列表失败'
      })
    }
  }
  // POST
  del = async (req, res, next) => {
    let {id} = req.body
    try{
      if(!id){
        throw new Error('请求参数错误')
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'REQUEST_PARAMS_ERROR',
        err: err.message
      })
      return
    }
    try{
      let type = await MenuDB.del(id)
      if (type) {
        res.send({
          status: 1,
          type: 'DELETE_TYPE_SUCCESS',
          data: type
        })
      }else{
        res.send({
          status: 0,
          type: 'ADD_TYPE_EMPTY',
          message: '删除分类异常'
        })
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'DELETE_TYPE_ERROT',
        err: '删除分类列表失败'
      })
    }
  }
  // POST
  updateImage = async (req, res, next) => {
    let {name} = req.body
    try{
      if(!name){
        throw new Error('请求参数错误')
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'REQUEST_PARAMS_ERROR',
        err: err.message
      })
      return
    }
  }
}

module.exports = new Menu()