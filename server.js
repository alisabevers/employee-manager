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
    (`SELECT employees.employee_id, employees.first_name, employees.last_name, roles.role_id, roles.salary 
    FROM employees 
    JOIN roles ON employees.employee_id = roles.role_id`, (err, rows) => {
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

// calls the main function to fun the app
homeScreen();