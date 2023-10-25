const checkPower = require('../middlewares/checkPower.js')
const express = require('express')
const router = express.Router()
const Goods = require('../controller/goods/goods.js')


router.get('/list', checkPower.checkShop, Goods.list);
router.get('/info', checkPower.checkShop, Goods.info);
router.post('/add', checkPower.checkShop, Goods.add);
router.post('/del', checkPower.checkShop, Goods.del);
router.post('/update', checkPower.checkShop, Goods.update);


module.exports = router
