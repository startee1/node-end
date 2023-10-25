const Shop = require('../controller/shop/shop.js')
const checkPower = require('../middlewares/checkPower.js')
const express = require('express')
const router = express.Router()

router.get('/check', checkPower.checkShop, Shop.check);
router.post('/init', checkPower.checkShop, Shop.init);
router.post('/update', checkPower.checkShop, Shop.update);


module.exports = router
