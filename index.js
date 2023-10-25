const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const path = require('path')
const express = require('express')
const { PORT } = require('./config')
const router = require('./routes')
const app = express()
const { COOKIESET } = require('./config')


app.use('/public', express.static(path.join(__dirname, "public")))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser(COOKIESET));

router(app)

app.listen(PORT, () => {
  console.log('start listen in port: ', PORT)
})