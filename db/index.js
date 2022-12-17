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

class Database {
	constructor(db) {
		this.db = db
	}

	fetchEmployees() {
		return this.db
			.promise()
			.query(
				"Select employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
			)
	}

	fetchRolls() {
		return this.db
			.promise()
			.query(
				'SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;'
			)
	}

	addEmployee(employee) {
		return this.db.promise().query('INSERT INTO employee set ?', employee)
	}
}

module.exports = Database
