const mysql  = require('../../basicApi/mysql.js')

class DataDB {
  constructor () {
  }
  async user () {
    let exist = await mysql.select('user', ['power'], `power <> '超级管理员'`)
    return exist.length > 0 ? exist : false
  }
  async goods () {
    let exist = await mysql.count('goods', `1=1`)
    return exist ? exist : false
  }
  async entryGet () {
    let exist = await mysql.select('data', ['num','day'], `1=1 order by id desc`,{page: 0,pagesize: 5})
    return exist ? exist.reverse() : false
  }
  async entrySum () {
    let sum = await mysql.query('select sum(num) as sum from data')
    return sum ? sum : 0
  }
  async entryCheck (day) {
    let exist = await mysql.select('data', ['num','day'], `day=${day}`)
    return exist.length > 0 ? true : false
  }
  async entryUpdate (day) {
    let exist = await mysql.update('data', 'num=num+1', `day=${day}`)
    return exist ? exist : false
  }
  async entryInit (day) {
    let exist = await mysql.insert('data', ['num','day'], [1,day])
    return exist ? exist : false
  }
}

module.exports = new DataDB()