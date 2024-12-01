const { Pool } = require('pg');
const inquirer = require('inquirer');
const DatabaseQueries = require('./src/queries');
require('dotenv').config();

// Database connection configuration
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
});

// Initialize DatabaseQueries with the connection pool
const dbQueries = new DatabaseQueries(pool);

// Main application menu
async function mainMenu() {
  try {
    const { action } = await inquirer.prompt([
      {
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
      }
    ]);

    switch (action) {
      case 'View All Departments':
        await viewDepartments();
        break;
      case 'View All Roles':
        await viewRoles();
        break;
      case 'View All Employees':
        await viewEmployees();
        break;
      case 'Add a Department':
        await addDepartment();
        break;
      case 'Add a Role':
        await addRole();
        break;
      case 'Add an Employee':
        await addEmployee();
        break;
      case 'Update an Employee Role':
        await updateEmployeeRole();
        break;
      case 'Exit':
        console.log('Goodbye!');
        pool.end();
        process.exit(0);
    }
  } catch (err) {
    console.error('Error in main menu:', err);
  }
}

// View Departments
async function viewDepartments() {
  try {
    const departments = await dbQueries.getAllDepartments();
    console.table(departments);
  } catch (err) {
    console.error('Error viewing departments:', err);
  }
  mainMenu();
}

// View Roles
async function viewRoles() {
  try {
    const roles = await dbQueries.getAllRoles();
    console.table(roles);
  } catch (err) {
    console.error('Error viewing roles:', err);
  }
  mainMenu();
}

// View Employees
async function viewEmployees() {
  try {
    const employees = await dbQueries.getAllEmployees();
    console.table(employees);
  } catch (err) {
    console.error('Error viewing employees:', err);
  }
  mainMenu();
}

// Add Department
async function addDepartment() {
  try {
    const { departmentName } = await inquirer.prompt([
      {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the department:',
        validate: input => input ? true : 'Department name cannot be empty'
      }
    ]);

    await dbQueries.addDepartment(departmentName);
    console.log(`Department ${departmentName} added successfully!`);
  } catch (err) {
    console.error('Error adding department:', err);
  }
  mainMenu();
}

// Add Role
async function addRole() {
  try {
    // First, get departments to choose from
    const departments = await dbQueries.getAllDepartments();
    const { roleName, salary, departmentId } = await inquirer.prompt([
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
    ]);

    await dbQueries.addRole(roleName, salary, departmentId);
    console.log(`Role ${roleName} added successfully!`);
  } catch (err) {
    console.error('Error adding role:', err);
  }
  mainMenu();
}

// Add Employee
async function addEmployee() {
  try {
    // Get roles and potential managers
    const roles = await dbQueries.getAllRoles();
    const employees = await dbQueries.getAllEmployees();

    const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Enter the employee\'s first name:',
        validate: input => input ? true : 'First name cannot be empty'
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Enter the employee\'s last name:',
        validate: input => input ? true : 'Last name cannot be empty'
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Select the employee\'s role:',
        choices: roles.map(role => ({
          name: role.title,
          value: role.id
        }))
      },
      {
        type: 'list',
        name: 'managerId',
        message: 'Select the employee\'s manager:',
        choices: [
          { name: 'No Manager', value: null },
          ...employees.map(emp => ({
            name: `${emp.first_name} ${emp.last_name}`,
            value: emp.id
          }))
        ]
      }
    ]);

    await dbQueries.addEmployee(firstName, lastName, roleId, managerId);
    console.log(`Employee ${firstName} ${lastName} added successfully!`);
  } catch (err) {
    console.error('Error adding employee:', err);
  }
  mainMenu();
}

// Update Employee Role
async function updateEmployeeRole() {
  try {
    // Get employees and roles
    const employees = await dbQueries.getAllEmployees();
    const roles = await dbQueries.getAllRoles();

    const { employeeId, roleId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'employeeId',
        message: 'Select the employee to update:',
        choices: employees.map(emp => ({
          name: `${emp.first_name} ${emp.last_name}`,
          value: emp.id
        }))
      },
      {
        type: 'list',
        name: 'roleId',
        message: 'Select the new role:',
        choices: roles.map(role => ({
          name: role.title,
          value: role.id
        }))
      }
    ]);

    await dbQueries.updateEmployeeRole(employeeId, roleId);
    console.log('Employee role updated successfully!');
  } catch (err) {
    console.error('Error updating employee role:', err);
  }
  mainMenu();
}

// Initialize the application
async function init() {
  console.log('Welcome to the Employee Tracker!');
  mainMenu();
}

init();

module.exports = { dbQueries, pool };
