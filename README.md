# Employee Manager

## Description
I've created an employee tracker, which connects to my employee database. The tracker allows you to view the departments, roles, and employees. You can also add a new department, role, and employee. 

Click on this [link]() to see a live demo of the Employee Tracker!

## Installation
Run this command in your terminal: ```npm i```

All of the dependencies are listed in the package.json file.

## Usage
* In the server.js file, there is a code block (starting from line 11) which connects the database in mysqsl to the server. You will have to add your mysql password on line 25.
* Log into mysql (through your terminal) and run the commands: ```SOURCE schema.sql;``` then ```SOURCE seeds.sql;```.
* QUIT or EXIT out of mysql and run ```node server.js``` in your terminal to open the server.
* Navigate through the prompts as you wish, to access/manipulate the data.
