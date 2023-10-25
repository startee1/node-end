const BaseComponent = require('../../basicApi/baseComponent')
const FrontDB = require('../../db/front/front')

class Front extends BaseComponent {
  constructor () {
    super()
  }
  // GET
  shop = async (req, res, next) => {
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
      let shop = await FrontDB.getIDShop(id)
      if (shop) {
        res.send({
          status: 1,
          type: 'GET_SHOP_SUCCESS',
          data: shop,
        })
      }else {
        res.send({
          status: 0,
          type: 'SHOP_EMPTY',
          err: '获取商店信息失败',
        })
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'GET_SHOP_ERROR',
        err: '获取商店信息错误',
      })
    }
  }
  // GET
  shoplist = async (req, res, next) => {
    const { title = '', typemainid = 0, typeviceid = 0, page = 0 } = req.query
    try{
      let shop = await FrontDB.getShop(title, typemainid, typeviceid, page)
      if (shop) {
        res.send({
          status: 1,
          type: 'GET_SHOP_SUCCESS',
          data: shop,
        })
      }else {
        res.send({
          status: 0,
          type: 'SHOP_EMPTY',
          err: '获取商铺列表失败',
        })
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'GET_SHOP_ERROR',
        err: '获取商铺列表错误',
      })
    }
  }
  // GET
  menu = async (req, res, next) => {
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
      let menu = await FrontDB.getMenu(id)
      let goods = await FrontDB.getGoods(id)
      if (menu) {
        res.send({
          status: 1,
          type: 'GET_MENU_SUCCESS',
          data: {
            menu,
            goods
          },
        })
      }else {
        res.send({
          status: 0,
          type: 'MENU_EMPTY',
          err: '获取菜单失败',
        })
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'GET_MENU_ERROR',
        err: '获取菜单错误',
      })
    }
  }
  // GET
  orderGet = async (req, res, next) => {
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
  commentGet = async (req, res, next) => {
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
  // POST
  orderSet = async (req, res, next) => {
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
  // POST
  commentSet = async (req, res, next) => {
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
}

module.exports = new Front()