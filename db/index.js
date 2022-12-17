require('dotenv').config()
// import the db connection module
const db = require('./connection')
class Database {
	constructor(db) {
		this.db = db
	}
	// fetches all employees from each department
	fetchEmployees() {
		return this.db
			.promise()
			.query(
				"Select employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
			)
	}
	// fetches all departments from the db
	fetchDepartments() {
		return this.db
			.promise()
			.query('SELECT department.id, department.name FROM department;')
	}
	// fetches all roles from the db
	fetchRoles() {
		return this.db
			.promise()
			.query(
				'SELECT role.id, role.title AS role, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;'
			)
	}
	// creates a new department and its a new row to the database
	createDepartment(data) {
		return this.db.promise().query('INSERT INTO department SET ?', data)
	}

	// combines all salaries from all departments and displays them as the total budget
	fetchTotalBudget() {
		return this.db
			.promise()
			.query(
				'SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;'
			)
	}
	// Find all departments
	fetchDepartments() {
		return this.db
			.promise()
			.query('SELECT department.id, department.name FROM department;')
	}

	// fetch the employees that are in the selected department
	fetchEmployeesByDepartment(departmentId) {
		return this.db
			.promise()
			.query(
				'SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;',
				departmentId
			)
	}
	// creates a new employee and adds them to the database
	addEmployee(employee) {
		return this.db.promise().query('INSERT INTO employee set ?', employee)
	}
	// creates a new role and adds a new column into the table
	createRole(roleData) {
		return this.db.promise().query('INSERT INTO role SET ?', roleData)
	}
}

module.exports = new Database(db)
