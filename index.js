require('dotenv').config()
const db = require('./db')
const { prompt } = require('inquirer')
// array of inquirer prompt questions
const questions = [
	{
		type: 'list',
		name: 'choice',
		message: 'Select option:',
		choices: [
			{
				name: 'View All Departments',
				value: 'VIEW_ALL_DEPARTMENTS',
			},
			{
				name: 'View All Roles',
				value: 'VIEW_ALL_ROLES',
			},
			{
				name: 'View All Employees',
				value: 'VIEW_ALL_EMPLOYEES',
			},
			{
				name: 'Add Department',
				value: 'ADD_DEPARTMENT',
			},
			{
				name: 'Add Role',
				value: 'ADD_ROLE',
			},
			{
				name: 'Add Employee',
				value: 'ADD_EMPLOYEE',
			},
			{
				name: 'Quit CMS',
				value: 'QUIT',
			},
		],
	},
]
// prompt questions to ask user
function initPrompt() {
	prompt(questions).then((selection) => {
		// depending on which option is selected, the corresponding function will be called
		switch (selection.choice) {
			case 'VIEW_ALL_DEPARTMENTS':
				viewByDepartment()
				break
			case 'VIEW_ALL_EMPLOYEES':
				viewAllEmployees()
				break
			case 'VIEW_ALL_ROLES':
				viewAllRoles()
				break
			case 'ADD_DEPARTMENT':
				addNewDepartment()
				break
			case 'ADD_ROLE':
				addNewRole()
				break
			case 'ADD_EMPLOYEE':
				addEmployee()
				break
			default:
				stopApp()
		}
	})
}

// fetches all the employees in all departments from the db
function viewAllEmployees() {
	console.log('view all')
	db.fetchEmployees()
		.then(([employeeRow]) => {
			let employeesData = employeeRow
			console.table(employeesData)
		})
		.then(() => initPrompt())
}

// adds an employee to the db
function addEmployee() {
	prompt([
		{
			name: 'first_name',
			message: "Enter employee's first name:",
		},
		{
			name: 'last_name',
			message: "Enter employee's last name:",
		},
	]).then((res) => {
		let firstName = res.first_name
		let lastName = res.last_name

		db.fetchRoles().then(([rows]) => {
			let roles = rows
			const roleChoices = roles.map(({ id, title }) => ({
				name: title,
				value: id,
			}))
			prompt({
				type: 'list',
				name: 'roleId',
				message: "What is the employee's role?",
				choices: roleChoices,
			}).then((res) => {
				let roleId = res.roleId
				db.fetchEmployees().then(([employeeRows]) => {
					let employees = employeeRows
					const managerChoices = employees.map(
						({ id, first_name, last_name }) => ({
							name: `${first_name} ${last_name}`,
							value: id,
						})
					)
					managerChoices.unshift({ name: 'None', value: null })
					prompt({
						type: 'list',
						name: 'managerId',
						message: "Select the employee's manager:",
						choices: managerChoices,
					})
						.then((data) => {
							let employee = {
								manager_id: data.managerId,
								role_id: roleId,
								first_name: firstName,
								last_name: lastName,
							}

							db.addEmployee(employee)
						})
						.then(() =>
							console.log(`Added ${firstName} ${lastName} to the database`)
						)
						.then(() => initPrompt())
				})
			})
		})
	})
}

// fetches all the departments in the db
function viewByDepartment() {
	db.fetchDepartments().then(([rows]) => {
		let departments = rows
		const departmentChoices = departments.map(({ id, name }) => ({
			name: name,
			value: id,
		}))
		prompt([
			{
				type: 'list',
				name: 'departmentId',
				message: 'Select which department to view:',
				choices: departmentChoices,
			},
		])
			.then((data) => db.fetchEmployeesByDepartment(data.departmentId))
			.then(([rows]) => {
				let employees = rows
				console.log('\n')
				console.table(employees)
			})
			.then(() => initPrompt())
	})
}

// View all roles
function viewAllRoles() {
	db.fetchRoles()
		.then(([rows]) => {
			let roles = rows
			console.log('\n')
			console.table(roles)
		})
		.then(() => initPrompt())
}

// Add a role to the database with its own row
function addNewRole() {
	db.fetchDepartments().then(([rows]) => {
		let departments = rows
		const departmentChoices = departments.map(({ id, name }) => ({
			name: name,
			value: id,
		}))
		prompt([
			{
				name: 'title',
				message: 'Enter the new role:',
			},
			{
				name: 'salary',
				message: 'Enter the salary of the role:',
			},
			{
				type: 'list',
				name: 'department_id',
				message: 'Select the corresponding department:',
				choices: departmentChoices,
			},
		]).then((data) => {
			db.createRole(data)
				.then(() => console.log(`Added ${data.title} to the database`))
				.then(() => initPrompt())
		})
	})
}
// Adds a department to the database with its own row
function addNewDepartment() {
	prompt([
		{
			name: 'name',
			message: 'Enter the name of the new department to add:',
		},
	]).then((data) => {
		let name = data
		db.createDepartment(name)
			.then(() => console.log(`Added ${name.name} to the database`))
			.then(() => initPrompt())
	})
}

// stops the app
function stopApp() {
	process.exit()
}
initPrompt()
