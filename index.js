const { prompt } = require('inquirer')

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
		// depending on which option is selected, the corresponding function will be called
		switch (selection.choice) {
			case 'VIEW_ALL_DEPARTMENTS':
				break
			case 'VIEW_ALL_EMPLOYEES':
				break
			case 'ADD_DEPARTMENT':
				break
			case 'ADD_ROLL':
				break
			case 'ADD_EMPLOYEE':
				break
			case 'UPDATE_EMPLOYEE_ROLE':
				break
		}
	})
}

initPrompt()
