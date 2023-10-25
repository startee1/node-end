const BaseComponent = require('../../basicApi/baseComponent')
const GoodsDB = require('../../db/goods/goods')
const checkType = require('../../utils/checkType')

class Goods extends BaseComponent {
  constructor () {
    super()
  }
  // GET
  info = async (req, res, next) => {
    const { id } = req.query
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
      let goods = await GoodsDB.info(id)
      if (goods) {
        res.send({
          status: 1,
          type: 'GET_GOODS_SUCCESS',
          data: goods,
        })
      }else {
        res.send({
          status: 0,
          type: 'GOODS_EMPTY',
          err: '该商品为空信息',
        })
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'GET_GOODS_ERROR',
        err: err.message,
      })
    }
  }
  // GET
  list = async (req, res, next) => {
    const { shopid } = req.query
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
      let goodsList = await GoodsDB.list(shopid)
      if (goodsList) {
        res.send({
          status: 1,
          type: 'GET_GOODSLIST_SUCCESS',
          data: goodsList,
        })
      }else {
        res.send({
          status: 0,
          type: 'GOODS_EMPTY',
          err: '该商铺商品为空信息',
        })
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'GET_GOODS_ERROR',
        err: '获取商铺商品信息出错',
      })
    }
  }
  // POST
  add = async (req, res, next) => {
    const { goods } = req.body
    try{
      if(!goods){
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
      let keys = ['pubdate'],values = [Date.now()]
      for(let key of Object.keys(goods)){
        keys.push(key)
        values.push(goods[key])
      }
      let goodsAdd = await GoodsDB.add(keys,values)
      if (goodsAdd) {
        res.send({
          status: 1,
          type: 'ADD_GOODS_SUCCESS',
          data: goodsAdd,
        })
      }else {
        res.send({
          status: 0,
          type: 'ADD_GOODS_FAIL',
          err: '无法添加商品信息',
        })
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'ADD_GOODS_ERROR',
        err: '添加商品信息错误',
      })
    }
  }
  // POST
  del = async (req, res, next) => {
    const { id } = req.body
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
      let goods = await GoodsDB.del(id)
      if (goods) {
        res.send({
          status: 1,
          type: 'DELETE_GOODS_SUCCESS',
          data: {
            message: '删除成功'
          }
        })
      }else {
        res.send({
          status: 0,
          type: 'DELETE_GOODS_FAIL',
          err: '无法删除商品信息',
        })
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'DELETE_GOODS_ERROR',
        err: '删除商品信息错误',
      })
    }
  }
  // POST
  update = async (req, res, next) => {
    let {info, id} = req.body
    try{
      if(Object.keys(info).length < 1){
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
      let data = ''
      for (let key of Object.keys(info)) {
        if (checkType(info[key]) == 'number') {
          data += `${key} = ${info[key]},`
        }else if (checkType(info[key]) == 'string'){
          data += ` ${key} = '${info[key]}',`
        }
      }
      data = data.slice(0,-1)
      let goods = await GoodsDB.update(data, id)
      if (goods) {
        res.send({
          status: 1,
          type: 'GOODSINFO_SUCCESS',
          data: goods,
        })
      }else {
        res.send({
          status: 0,
          type: 'GOODSINFO_FAIL',
          err: '无法更新该商品信息',
        })
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'INIT_GOODSINFO_ERROR',
        err: err.message,
      })
    }
  }
}

module.exports = new Goods()