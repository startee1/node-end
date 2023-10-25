const Data = require('../controller/data/data.js')
const express = require('express')
const router = express.Router()

router.get('/all', Data.all);
router.post('/entry', Data.entrySet);

module.exports = router