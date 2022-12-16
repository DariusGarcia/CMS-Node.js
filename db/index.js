const mysql = require('mysql2')

const db = mysql.createConnection(
	{
		host: 'localhost',
		user: 'root',
		password: process.env.PASSWORD,
		database: 'employees',
	},
	console.log('Connected to employees_db')
)

db.connect(function (err) {
	if (err) throw err
})

module.exports = db
