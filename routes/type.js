const checkPower = require('../middlewares/checkPower.js')
const express = require('express')
const router = express.Router()
const Type = require('../controller/type/type.js')


router.get('/list', Type.list);
router.post('/add', checkPower.checkSuperAdmin, Type.add);
router.post('/del', checkPower.checkSuperAdmin, Type.del);
router.post('/img', checkPower.checkSuperAdmin, Type.img);


module.exports = router
