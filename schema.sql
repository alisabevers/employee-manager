-- DROP DATABASE IF EXISTS employee_manager_db;
CREATE DATABASE employee_manager_db;

USE employee_manager_db;

CREATE TABLE departments (
    dept INT NOT NULL,
    name VARCHAR(30) NOT NULL PRIMARY KEY
);

CREATE TABLE roles (
    role_id INT PRIMARY KEY NOT NULL,
    job_title VARCHAR(30),
    dept VARCHAR(30) NOT NULL,
    FOREIGN KEY (dept) REFERENCES departments(name),
    salary INT NOT NULL
);

CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    job_title VARCHAR(30) NOT NULL,
    dept VARCHAR(30) NOT NULL,
    salary INT NOT NULL,
    manager VARCHAR(30) NOT NULL
);
