const Admin = require('../controller/admin/admin.js')
const express = require('express')
const router = express.Router()

router.post('/login', Admin.login);
router.post('/register', Admin.register);
router.post('/registerShop', Admin.registerShop);

module.exports = router
