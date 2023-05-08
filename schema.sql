DROP DATABASE IF EXISTS employee_manager_db;
CREATE DATABASE employee_manager_db;

USE employee_manager_db;

CREATE TABLE departments (
    dept_id INT AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
);

ALTER TABLE departments AUTO_INCREMENT = 1;

CREATE TABLE roles (
    role_id INT NOT NULL,
    job_title VARCHAR(30) PRIMARY KEY,
    salary INT NOT NULL DEFAULT 0,
    dept VARCHAR(30) NOT NULL
);

CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    title VARCHAR(30),
    manager_id INT,
    FOREIGN KEY (title) REFERENCES roles(job_title),
    FOREIGN KEY (manager_id) REFERENCES employees(employee_id) ON DELETE SET NULL
);


