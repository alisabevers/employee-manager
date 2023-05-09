const inquirer = require('inquirer');
const express = require('express');
const mysql2 = require('mysql2');
const app = express();

require('dotenv').config();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql2.createConnection (
  {
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database: 'employee_manager_db'
  },
  console.log(`You are now connected to the employee_manager_db database. \n\n 
  Welcome to the Employee Tracker. \n`)
);

// This function runs the homeScreen. Functions to handle each option/selection are coded separately.
function homeScreen() {
  inquirer.prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'dbTables',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role'],
    },
  ]).then(({ dbTables }) => {
    switch (dbTables) {
      case 'View all departments':
        viewDepts();
        break;
      case 'View all roles':
        viewRoles();
        break;
      case 'View all employees':
        viewEmployees();
        break;
      case 'Add a department':
        addDept();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        return;
    }
  });
};

// Handles when the user selects to View all Departments
const viewDepts = () => {
  db.query(`SELECT * FROM departments`, (err, rows) => {
    if (err) {
      throw err;
    } else {
      console.log('\n');
      console.table(rows);
      return homeScreen();
    }
  });
};

// Handles when the user selects to View all Roles
const viewRoles = () => {
  db.query(`SELECT * FROM roles`, (err, rows) => {
    if (err) {
      throw err;
    } else {
      console.log('\n');
      console.table(rows);
      return homeScreen();
    }
  });
};

// Handles when the user selects to View all Employees
const viewEmployees = () => {
  db.query
    (`SELECT employees.employee_id, employees.first_name, employees.last_name, roles.job_title, roles.salary
    FROM employees 
    LEFT JOIN roles ON employees.role_id = roles.role_id`, (err, rows) => {
      if (err) {
        throw err;
      } else {
        console.log('\n');
        console.table(rows);
        return homeScreen();
      }
    });
};

// Handles when the user selects to Add a Department
const addDept = () => {
  return inquirer.prompt([
    {
      type: 'input',
      message: 'What is the name of the new department?',
      name: 'dept_name',
    }
  ]).then(response => {
    const params = response.dept_name;
    db.query(`INSERT INTO departments (dept_name) VALUES (?);`, [params], (err) => {
      if (err) {
        throw err;
      } else {
        console.log('Department added.');
        return viewDepts();
      }
    })
  })
}

// Handles when the user selects to Add a new Role
const addRole = () => {
  return inquirer.prompt([
    {
      type: 'input',
      message: 'What is the name of the new role?',
      name: 'job_title'
    },
    {
      type: 'input',
      message: 'What is the salary of the new role?',
      name: 'salary'
    },
    {
      type: 'input',
      message: 'What is the dept_id of the new role?',
      name: 'dept_id'
    }
  ]).then(response => {
    const params = [response.job_title, response.salary, response.dept_id];
    db.query('INSERT INTO roles (job_title, salary, dept_id) VALUES(?)', [params], (err) => {
      if (err) {
        throw err;
      } else {
        console.log('Role added.');
        return viewRoles();
      }
    })
  })
}

// Handles when the user selects to Add an employee
const addEmployee = () => {
  return inquirer.prompt([
    {
      type: 'input',
      message: 'What is the new employee\'s first name?',
      name: 'first_name'
    },
    {
      type: 'input',
      message: 'What is the new employee\'s last name?',
      name: 'last_name'
    },
    {
      type: 'input',
      message: 'What is the new employee\'s role_id?',
      name: 'role_id'
    }
  ]).then(response => {
    const params = [response.first_name, response.last_name, response.role_id];
    db.query('INSERT INTO employees (first_name, last_name, role_id) VALUES(?)', [params], (err) => {
      if (err) {
        throw err;
      } else {
        console.log('Employee added.');
        return viewEmployees();
      }
    })
  })
}

// Handles when the user selects to Update an employee
const updateEmployeeRole = () => {
  db.query(`SELECT first_name, last_name, employee_id FROM employees`, (err, rows) => {
    if (err) {
      throw err;
    }
    const employees = rows.map(({ first_name, last_name, employee_id }) => ({name: `${first_name} ${last_name}`, value: employee_id}));
    inquirer.prompt([
      {
        type: 'list',
        message: 'Which employee\'s role would you like to update?',
        name: 'employee',
        choices: employees
      }
    ]).then(employeeResponse => {
      const employee = employeeResponse.employee;
      const params = [employee];
      db.query(`SELECT job_title, role_id FROM roles`, (err, rows) => {
        if (err) {
          throw err;
        }
          const roles = rows.map(({ job_title, role_id}) => ({ name: job_title, value: role_id }));
          inquirer.prompt([
            {
              type: 'list',
              message: 'What is the role_id for the employee?',
              name: 'newRole',
              choices: roles
            }
          ]).then(rolesResponse => {
            const role = rolesResponse.role;
            params.unshift(role);
            db.query(`UPDATE employees
            SET role_id = ?
            WHERE role_id = ?`, params, (err) => {
              if (err) {
                throw err;
              }
              console.log('Employee role updated');
              return viewEmployees();
            });
          });
      });
    });
  });
};

// calls the main function to fun the app
homeScreen();