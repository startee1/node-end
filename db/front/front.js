const mysql  = require('../../basicApi/mysql.js')

class FrontDB {
  constructor () {
  }
  async getShop (title, typemainid, typeviceid, page) {
    let where = ''
    if (title) where += ` title='%${title}%' and`
    if (typemainid) where += ` typemainid=${typemainid} and`
    if (typeviceid) where += ` typeviceid=${typeviceid} and`
    if (where.length == 0){
      where = '1=1'
    }else{
      where = where.slice(0,-3)
    }
    let shopList = await mysql.select('shop', '*', where,{page,pagesize: 10})
    return shopList.length > 0 ? shopList : false
  }
  async getIDShop (id) {
    let shopList = await mysql.select('shop', '*', `id=${id}`)
    return shopList.length > 0 ? shopList[0] : false
  }
  async getMenu (id) {
    let menu = await mysql.select('menu', '*', `shopid=${id}`)
    return menu.length > 0 ? menu : false
  }
  async getGoods (id) {
    let goods = await mysql.select('goods', '*', `shopid=${id}`)
    return goods.length > 0 ? goods : false
  }
  async login (username, pwd) {
    let user = await mysql.select('user', ['username', 'name', 'power', 'id'], ` bin = 1 and username = '${username}' and pwd = '${pwd}'`)
    return user.length > 0 ? user[0] : false
  }
  async register (username, pwd, power) {
    let pubdate = Date.now()
    let user = await mysql.insert('user',['username','pwd','power','bin','name','pubdate'],[username,pwd,power,1,power,pubdate])
    return user.length > 0
  }
}

module.exports = new FrontDB()