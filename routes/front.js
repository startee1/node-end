const Front = require('../controller/front/front.js')
const express = require('express')
const router = express.Router()

router.get('/shop', Front.shop);
router.get('/shoplist', Front.shoplist);
router.get('/menu', Front.menu);

module.exports = router
