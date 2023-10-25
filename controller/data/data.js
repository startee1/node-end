const BaseComponent = require('../../basicApi/baseComponent')
const DataDB = require('../../db/data/data')

class Data extends BaseComponent {
  constructor () {
    super()
  }
  // GET
  all = async (req, res, next) => {
    let day = new Date().toLocaleDateString()
    try{
      let user = await DataDB.user()
      let goods = await DataDB.goods()
      let entry = await DataDB.entryGet()
      let sum = await DataDB.entrySum()
      if (user && goods && entry) {
        res.send({
          status: 1,
          type: 'GET_INFO_SUCCESS',
          data: {
            user,
            goods,
            entry,
            sum,
          },
        })
      }else {
        res.send({
          status: 0,
          type: 'GET_INFO_EMPTY',
          err: '获取信息失败',
        })
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'GET_USER_ERROR',
        err: '获取信息错误',
      })
    }
  }
  // POST
  entrySet = async (req, res, next) => {
    let day = new Date().toLocaleDateString()
    try{
      let check = await DataDB.entryCheck(day)
      let entry;
      if(check){
        entry = await DataDB.entryUpdate(day)
      }else{
        entry = await DataDB.entryInit(day)
      }
      if (entry) {
        res.send({
          status: 1,
          type: 'SET_ENTRY_SUCCESS',
          data: entry,
        })
      }else {
        res.send({
          status: 0,
          type: 'SET_ENTRY_EMPTY',
          err: '添加信息失败',
        })
      }
    }catch(err){
      res.send({
        status: 0,
        type: 'SET_ENTRY_ERROR',
        err: '添加信息错误',
      })
    }
  }
}

module.exports = new Data()