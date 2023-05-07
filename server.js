 const inquirer = require('inquirer');
 const express = require('express');
 const mysql2 = require('mysql2');

 const PORT = process.env.PORT || 3001;
 const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql2.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '@lisapolkadotz25!',
    database: 'employee_manager_db'
  },
  console.log(`Connected to the employee_manager_db database.`)
);

 inquirer.prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'db-tables',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    }
 ]).then((response) => {
    // console.log(response);
    if(response === 'View all departments') {
      db.query('SELECT * FROM departments;', function (err, results) {
        console.log(results);
      });
    } 
 });