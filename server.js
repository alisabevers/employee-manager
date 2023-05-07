const inquirer = require('inquirer');
const express = require('express');
const mysql2 = require('mysql2');
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
const viewEmployees = () => {
  db.query
    (`SELECT employee_id, first_name, last_name FROM employees;
    SELECT job_title, salary FROM roles;
    SELECT dept_name AS department FROM departments;
    FROM employees
    LEFT JOIN roles
    ON employees.employee_id = roles.job_title`
    // FROM employees JOIN roles ON employees.job_title_id = roles.job_title
    , (err, rows) => {
      if (err) {
        throw err;
      } else {
        console.log('\n');
        console.table(rows);
        return homeScreen();
      }
    });
};

// calls the main function to fun the app
homeScreen();