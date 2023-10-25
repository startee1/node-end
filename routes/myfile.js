const myfile = require('../controller/myfile/myfile.js')
const express = require('express')
const router = express.Router()
const multer = require('multer')

router.post('/image',multer({dest: "public/images"}).array("file", 1), myfile.image);

module.exports = router
