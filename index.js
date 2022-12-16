const { prompt } = require('inquirer')

const questions = [
	{
		type: 'list',
		name: 'choice',
		message: 'Select option:',
		choices: [
			{
				name: 'View All Departments',
				value: 'VIEW_DEPARTMENTS',
			},
			{
				name: 'View All Roles',
				value: 'VIEW_ROLES',
			},
			{
				name: 'View All Employees',
				value: 'VIEW_EMPLOYEES',
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
				name: 'Update Employee Role',
				value: 'UPDATE_EMPLOYEE_ROLE',
			},

			{
				name: 'Quit CMS',
				value: 'QUIT',
			},
		],
	},
]

function initPrompt() {
	prompt(questions).then((selection) => {
		console.log(selection.choice)
	})
}

initPrompt()
