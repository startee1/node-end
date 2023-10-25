const BaseComponent = require('../../basicApi/baseComponent')
const {MAP_AK} = require('../../config/index')
const axios = require('axios')

class Map extends BaseComponent {
  constructor () {
    super()
  }
  // GET
  search = async (req, res, next) => {
    let {key} = req.query
    try{
      axios.get(`https://api.map.baidu.com/place/v2/suggestion?query=${key}&region=广东&city_limit=true&output=json&ak=${MAP_AK}`)
      .then(result => {
        res.send({
          status: 1,
          type: 'MAP_SEARCH_SUCCESS',
          data: result.data
        })
      })
    }catch(err){
      res.send({
        status: 0,
        type: 'MAP_SEARCH_FAIL',
        err: '地址搜索失败',
      })
    }
  }
}

module.exports = new Map()