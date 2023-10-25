const mysql = require('mysql')
const {HOST, USER, PASSWORD, DATABASE} = require('../config')
const pool = mysql.createPool({
  host     : HOST,
  user     : USER,
  password : PASSWORD,
  database : DATABASE
});
const checkType = require('../utils/checkType')

let query = function(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) reject(err);
      else {
        connection.query(sql, values, (err, rows) => {
          if (err) {console.log(err);reject(err);}
          else {
            resolve(rows);
            connection.release();
          }
        });
      }
    });
  })
};

let count = async function(table, where, callback) {
  if(!table){
    throw 'COUNT params `table` is NULL'
  }else if(!where){
    throw 'COUNT params `where` is NULL'
  }else{
    const sql = `SELECT count(*) as count from ${table} WHERE ${where}`;
    const res = await query(sql, null, callback);
    return res[0].count;
  }
}

let select = function(table, keys, where, limit, callback) {
  if(!table){
    throw 'SELECT params `table` is NULL'
  }else if(!keys){
    throw 'SELECT params `keys` is NULL'
  }else if(!where){
    throw 'SELECT params `where` is NULL'
  }else{
    
    let values = ''
    if(checkType(keys) === 'string'){
      values = keys;
    }else if(checkType(keys) === 'array'){
      values = keys.join(',');
    }else{
      throw 'SELECT params `keys` must be String or Array'
    }


    let my_limit = ''
    if(limit){
      if(limit.page == null || limit.page == undefined){
        limit.page = 0
      }else if(limit.pagesize == null || limit.pagesize == undefined){
        limit.pagesize = 10
      }
      my_limit = `limit ${limit.page},${limit.pagesize}`
    }


    const sql = `SELECT ${values} FROM ${table} WHERE ${where} ${my_limit}`;
    return query(sql, null, callback)
  }
}

let insert = function(table, keys, values, callback) {
  if(!table){
    throw 'INSERT params `table` is NULL'
  }else if(!keys || keys.length < 0){
    throw 'INSERT params `keys` is NULL'
  }else if(!values || values.length < 0){
    throw 'INSERT params `values` is NULL'
  }else{
    let data = ''
    for (let i = 0; i < keys.length; i++) {
      data += '?,'
    }
    data = data.slice(0,-1)
    keys = keys.join(',') 
    let sql = `INSERT INTO ${table}(${keys}) VALUES (${data})`;
    return query(sql, values, callback);
  }
}

// 更新数据
let update = function(table, data, where, callback) {
  if(!table){
    throw 'UPDATE params `table` is NULL'
  }else if(!data){
    throw 'UPDATE params `data` is NULL'
  }else if(!where){
    throw 'UPDATE params `where` is NULL'
  }else{
    const sql = `UPDATE ${table} SET ${data} WHERE ${where} `;
    return query(sql, null, callback);
  }
}

// 删除数据
let remove = function(table, where, callback) {
  if(!table){
    throw 'DELETE params `table` is NULL'
  }else if(!where){
    throw 'DELETE params `where` is NULL'
  }else{
    const sql = `DELETE FROM ${table} WHERE ${where}`;
    return query(sql, null, callback);
  }
}

let test = async function(table){
  return query(`select * from ${table}`)
}

module.exports = {query,count,select,insert,update,remove,test}