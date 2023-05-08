const inquirer = require('inquirer');
const express = require('express');
const mysql2 = require('mysql2');
const { count } = require('console');
const PORT = process.env.PORT || 3001;
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
// NEED TO ADD/EDIT: add department, and make the role_id equal the job title.
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

const addDept = () => {
  return inquirer.prompt([
    {
      type: 'input',
      message: 'What is the name of the new department?',
      name: 'dept_name',
      validate: deptNameInput => {
        if (deptNameInput) {
          return true;
        } else {
          return false;
        };
      }
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

const addRole = () => {
  return inquirer.prompt([
    {
      type: 'input',
      message: 'What is the name of the new role',
      name: 'job_title',
      validate: roleNameInput => {
        if (roleNameInput) {
          return true;
        } else {
          return false;
        };
      }
    },
    {
      type: 'input',
      message: 'What is the salary of the new role',
      name: 'salary',
      validate: salaryInput => {
        if (salaryInput) {
          return true;
        } else {
          return false;
        };
      }
    },{
      type: 'input',
      message: 'What is the dept_id of the new role',
      name: 'dept_id',
      validate: deptIdInput => {
        if (deptIdInput) {
          return true;
        } else {
          return false;
        };
      }
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

const addEmployee = () => {
  return inquirer.prompt([
    {
      type: 'input',
      message: 'What is the first name of the new employee',
      name: 'first_name',
      validate: firstNameInput => {
        if (firstNameInput) {
          return true;
        } else {
          return false;
        };
      }
    },
    {
      type: 'input',
      message: 'What is the last name of the new employee',
      name: 'last_name',
      validate: lastNameInput => {
        if (lastNameInput) {
          return true;
        } else {
          return false;
        };
      }
    },{
      type: 'input',
      message: 'What is the role_id of the new employee',
      name: 'role_id',
      validate: roleIdInput => {
        if (roleIdInput) {
          return true;
        } else {
          return false;
        };
      }
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

// calls the main function to fun the app
homeScreen();