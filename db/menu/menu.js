const mysql  = require('../../basicApi/mysql.js')

class MenuDB {
  constructor () {
  }
  async list (shopid) {
    let list = await mysql.select('menu', '*', ` shopid = ${shopid}`)
    return list.length > 0 ? list : false
  }
  async add (name, shopid) {
    let add = await mysql.insert('menu', ['name','shopid'], [name, shopid])
    return add ? add : false
  }
  async del (id) {
    let del = await mysql.remove('menu', `id = ${id}`)
    return del ? del : false
  }
}

module.exports = new MenuDB()