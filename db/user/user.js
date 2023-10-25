const mysql  = require('../../basicApi/mysql.js')

class UserDB {
  constructor () {
  }
  async list (page = 1, pagesize = 10) {
    let userList = await mysql.select('user', ['username','name','power','pubdate','id'], ` power <> '超级管理员' and bin = 1 order by pubdate desc`,{page, pagesize})
    return userList.length > 0 ? userList : false
  }
  async count () {
    let count = await mysql.count('user',` power <> '超级管理员' and bin = 1 `)
    return count ? count : false
  }
  async delete (id) {
    let user = await mysql.remove('user',`bin = 1 and id=${id}`)
    return user ? user : false
  }
  async checkPassword (username, password) {
    let check = await mysql.select('user', ['name'], ` username = '${username}' and pwd = '${password}' and bin = 1 `)
    return check.length > 0 ? check : false
  }
  async updatePassword (id, username, password) {
    let check = await mysql.update('user', `pwd = '${password}'`, ` id = ${id} and username = '${username}'  and bin = 1 `)
    return check ? check : false
  }
}

module.exports = new UserDB()