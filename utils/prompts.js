import inquirer from "inquirer";

// Prompt for main menu
const mainMenuPrompt = {
  type: 'list',
  name: 'action',
  message: 'What would you like to do?',
  choices: [
    'View All Departments',
    'View All Roles',
    'View All Employees',
    'Add a Department',
    'Add a Role',
    'Add an Employee',
    'Update an Employee Role',
    'Exit'
  ]
};

const viewAllDepartmentsPrompt = [
    {
        type: 'list',
        name: 'action',
        message: 'Select an department',
        choices: departments.map(dept => ({
            name: dept.name,
            value: dept.id
        }))

    }
]

const viewAllRolesPrompt = [
    {
        type: 'list',
        name: 'action',
        message: 'Select an role',
        choices: roles.map(role => ({
            name: role.title,
            value: role.id
        }))

    }
]

const viewAllEmployeesPrompt = [
    {
        type: 'list',
        name: 'action',
        message: 'Select an employee',
        choices: employees.map(employee => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }))
    }
]


// Prompt for adding a department
const addDepartmentPrompt = [
  {
    type: 'input',
    name: 'departmentName',
    message: 'Enter the name of the department:',
    validate: input => input ? true : 'Department name cannot be empty'
  }
];

// Prompt for adding a role
const addRolePrompts = (departments) => [
  {
    type: 'input',
    name: 'roleName',
    message: 'Enter the name of the role:',
    validate: input => input ? true : 'Role name cannot be empty'
  },
  {
    type: 'number',
    name: 'salary',
    message: 'Enter the salary for this role:',
    validate: input => input > 0 ? true : 'Salary must be a positive number'
  },
  {
    type: 'list',
    name: 'departmentId',
    message: 'Select the department for this role:',
    choices: departments.map(dept => ({
      name: dept.name,
      value: dept.id
    }))
  }
];

const addEmployeePrompts = (roles, employees) => [
    {
        type: 'input',
        name: 'firstName',
        message: "Enter the employee's first name:",
        validate: input => input ? true : 'First name cannot be empty'
        },
        {
        type: 'input',
        name: 'lastName',
        message: "Enter the employee's last name:",
        validate: input => input ? true : 'Last name cannot be empty'
        },
        {
        type: 'input',
        name: 'roleId',
        message: "Select the employee's role:",
        choices: roles.map(role => ({
            name: role.title,
            value: role.id
        }))
        },
        {
        type: 'input',
        name: 'managerId',
        message: "Select the employee's manager:",
        choices: employees.map(employee => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id
        }))
        }
    ];
      

export {
  mainMenuPrompt,
  viewAllDepartmentsPrompt,
  viewAllRolesPrompt,
  viewAllEmployeesPrompt,
  addDepartmentPrompt,
  addRolePrompts,
  addEmployeePrompts
};