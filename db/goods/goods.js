const mysql  = require('../../basicApi/mysql.js')

class GoodsDB {
  constructor () {
  }
  async info (id) {
    let goods = await mysql.select('goods','*',` id = ${id} `)
    return goods.length > 0 ? goods[0] : false
  }
  async list (shopid) {
    let goodsList = await mysql.select('goods','*',` shopid = ${shopid} `)
    return goodsList.length > 0 ? goodsList : false
  }
  async add (keys, values) {
    let goods = await mysql.insert('goods',keys,values)
    return goods ? goods : false
  }
  async update (data, goodsid) {
    let goodsUpdate = await mysql.update('goods',data,` id = ${goodsid} `)
    return goodsUpdate ? goodsUpdate : false
  }
  async del (id) {
    let goodsDel = await mysql.remove('goods',` id = ${id} `)
    return goodsDel ? goodsDel : false
  }
}

module.exports = new GoodsDB()