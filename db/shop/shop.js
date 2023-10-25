const mysql  = require('../../basicApi/mysql.js')

class ShopDB {
  constructor () {
  }
  async check (shopid) {
    let shopExist = await mysql.select('shop','*',` bin = 1 and shopid = ${shopid} `)
    return shopExist.length > 0 ? shopExist[0] : false
  }
  async init (keys, values) {
    let shopInsert = await mysql.insert('shop',keys, values)
    return shopInsert ? shopInsert : false
  }
  async update (data, id) {
    let shopInsert = await mysql.update('shop',data, ` bin = 1 and shopid = ${id}`)
    return shopInsert ? shopInsert : false
  }
}

module.exports = new ShopDB()