const admin = require('./admin')
const user = require('./user')
const shop = require('./shop')
const map = require('./map')
const myfile = require('./myfile')
const type = require('./type')
const menu = require('./menu')
const goods = require('./goods')
const front = require('./front')
const data = require('./data')

module.exports = app => {
	app.use('/admin', admin);
	app.use('/user', user);
	app.use('/shop', shop);
	app.use('/map', map);
	app.use('/myfile', myfile);
	app.use('/type', type);
	app.use('/menu', menu);
	app.use('/goods', goods);
	app.use('/front', front);
	app.use('/data', data);
}