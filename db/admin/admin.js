const mysql  = require('../../basicApi/mysql.js')

class AdminDB {
  constructor () {
  }
  async checkUsernameExist (username) {
    let exist = await mysql.select('user', '*', ` bin = 1 and username = '${username}'`)
    return exist.length > 0
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

module.exports = new AdminDB()