const mysql  = require('../../basicApi/mysql.js')

class TypeDB {
  constructor () {
  }
  async list () {
    let list = await mysql.select('type',['id','parentid','name','image'],` bin = 1 `)
    return list.length > 0 ? list : false
  }
  async add (name, parentid) {
    let add = await mysql.insert('type',['name', 'parentid','bin'],[name, parentid,1])
    return add ? add : false
  }
  async del (id) {
    let del = await mysql.remove('type', ` id = ${id} `)
    return del ? del : false
  }
  async img (image, id) {
    let myimg = await mysql.update('type',` image='${image}' `,` id = ${id} and bin = 1 `)
    return myimg ? myimg : false
  }
}

module.exports = new TypeDB()