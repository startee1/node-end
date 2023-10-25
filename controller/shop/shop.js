const BaseComponent = require('../../basicApi/baseComponent')
const ShopDB = require('../../db/shop/shop')
const checkType = require('../../utils/checkType')

class Shop extends BaseComponent {
  constructor () {
    super()
  }
  // GET
  check = async (req, res, next) => {
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
      let shopInfo = await ShopDB.check(shopid)
      if (shopInfo) {
        res.send({
          status: 1,
          type: 'CHCEK_SHOPINFO_SUCCESS',
          data: shopInfo,
        })
      }else {
        res.send({
          status: 0,
          type: 'SHOPINFO_EMPTY',
          err: '无法找出该商铺信息',
        })
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'CHECK_SHOPINFO_ERROR',
        err: '检查商铺信息出错',
      })
    }
  }
  // POST
  init = async (req, res, next) => {
    let {info, shopid} = req.body
    let keys = ['shopid','bin'], values = [shopid,1]
    try{
      if(Object.keys(info).length < 6){
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
      for (let key of Object.keys(info)) {
        keys.push(key)
        values.push(info[key])
      }
      let shopInit = await ShopDB.init(keys, values)
      if (shopInit) {
        res.send({
          status: 1,
          type: 'INIT_SHOPINFO_SUCCESS',
          data: shopInit,
        })
      }else {
        res.send({
          status: 0,
          type: 'SHOPINFO_FAIL',
          err: '无法插入该商铺信息',
        })
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'INIT_SHOPINFO_ERROR',
        err: '添加商铺信息出错',
      })
    }
  }
  // POST
  update = async (req, res, next) => {
    let {info, shopid} = req.body
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
      let shopInit = await ShopDB.update(data, shopid)
      if (shopInit) {
        res.send({
          status: 1,
          type: 'INIT_SHOPINFO_SUCCESS',
          data: shopInit,
        })
      }else {
        res.send({
          status: 0,
          type: 'SHOPINFO_FAIL',
          err: '无法更新该商铺信息',
        })
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'INIT_SHOPINFO_ERROR',
        err: '更新商铺信息出错',
      })
    }
  }
}

module.exports = new Shop()