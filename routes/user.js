const User = require('../controller/user/user.js')
const checkPower = require('../middlewares/checkPower.js')
const express = require('express')
const router = express.Router()

router.get('/list', User.list);
router.get('/count', User.count);
router.post('/delete', checkPower.checkSuperAdmin, User.delete);
router.post('/password', User.password);

module.exports = router
