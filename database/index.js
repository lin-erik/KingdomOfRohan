var mysql = require ('mysql');
module.exports.db = mysql.createConnection ({
	host: 'localhost',
	user: '',
	password: ''
})