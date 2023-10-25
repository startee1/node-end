const checkPower = require('../middlewares/checkPower.js')
const express = require('express')
const router = express.Router()
const Menu = require('../controller/menu/menu.js')


router.get('/list', checkPower.checkShop, Menu.list);
router.post('/add', checkPower.checkShop, Menu.add);
router.post('/del', checkPower.checkShop, Menu.del);


module.exports = router
