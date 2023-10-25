const BaseComponent = require('../../basicApi/baseComponent')
const TypeDB = require('../../db/type/type')

class MyType extends BaseComponent {
  constructor () {
    super()
  }
  // GET
  list = async (req, res, next) => {
    try{
      let type = await TypeDB.list()
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
    let {name, parentid = 0} = req.body
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
    try{
      let type = await TypeDB.add(name, parentid)
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
      let type = await TypeDB.del(id)
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
  img = async (req, res, next) => {
    let {name, id} = req.body
    try{
      if(!name || !id){
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
      let img = await TypeDB.img(name, id)
      if (img) {
        res.send({
          status: 1,
          type: 'UPLOAD_IMAGE_SUCCESS',
        })
      }else{
        res.send({
          status: 0,
          type: 'UPLOAD_IMAGE_FAIL',
          message: '上传图片异常'
        })
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'UPLOAD_IMAGE_ERROR',
        err: '上传图片失败'
      })
    }
  }
}

module.exports = new MyType()