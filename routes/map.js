const Map = require('../controller/map/map.js')
const express = require('express')
const router = express.Router()

router.get('/search', Map.search);

module.exports = router
