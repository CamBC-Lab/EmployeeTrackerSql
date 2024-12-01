// const { Pool } = require('pg');

// Database query class to handle all SQL operations
class DatabaseQueries {
  constructor(pool) {
    this.pool = pool;
  }

  // View all departments
  async getAllDepartments() {
    try {
      const result = await this.pool.query('SELECT * FROM department');
      return result.rows;
    } catch (err) {
      console.error('Error fetching departments:', err);
      throw err;
    }
  }

  // View all roles with department information
  async getAllRoles() {
    try {
      const result = await this.pool.query(`
        SELECT 
          role.id, 
          role.title, 
          role.salary, 
          department.name AS department_name
        FROM role
        JOIN department ON role.department_id = department.id
      `);
      return result.rows;
    } catch (err) {
      console.error('Error fetching roles:', err);
      throw err;
    }
  }

  // View all employees with detailed information
  async getAllEmployees() {
    try {
      const result = await this.pool.query(`
        SELECT 
          e.id, 
          e.first_name, 
          e.last_name, 
          r.title, 
          d.name AS department,
          r.salary,
          CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM employee e
        LEFT JOIN role r ON e.role_id = r.id
        LEFT JOIN department d ON r.department_id = d.id
        LEFT JOIN employee m ON e.manager_id = m.id
      `);
      return result.rows;
    } catch (err) {
      console.error('Error fetching employees:', err);
      throw err;
    }
  }

  // Add a new department
  async addDepartment(name) {
    try {
      const result = await this.pool.query(
        'INSERT INTO department (name) VALUES ($1) RETURNING *', 
        [name]
      );
      return result.rows[0];
    } catch (err) {
      console.error('Error adding department:', err);
      throw err;
    }
  }

  // Add a new role
  async addRole(title, salary, departmentId) {
    try {
      const result = await this.pool.query(
        'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *',
        [title, salary, departmentId]
      );
      return result.rows[0];
    } catch (err) {
      console.error('Error adding role:', err);
      throw err;
    }
  }

  // Add a new employee
  async addEmployee(firstName, lastName, roleId, managerId) {
    try {
      const result = await this.pool.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [firstName, lastName, roleId, managerId]
      );
      return result.rows[0];
    } catch (err) {
      console.error('Error adding employee:', err);
      throw err;
    }
  }

  // Update an employee's role
  async updateEmployeeRole(employeeId, roleId) {
    try {
      const result = await this.pool.query(
        'UPDATE employee SET role_id = $1 WHERE id = $2 RETURNING *',
        [roleId, employeeId]
      );
      return result.rows[0];
    } catch (err) {
      console.error('Error updating employee role:', err);
      throw err;
    }
  }
}

module.exports = DatabaseQueries;