const mysql = require('mysql2')

const db = mysql.createConnection(
	{
		host: 'localhost',
		user: process.env.USER,
		password: process.env.PASSWORD,
		database: 'employees_db',
	},
	console.log('Connected to employees_db')
)
db.connect(function (err) {
	if (err) throw err
})
module.exports = db
