DROP DATABASE IF EXISTS employee_manager_db;
CREATE DATABASE employee_manager_db;

USE employee_manager_db;

CREATE TABLE departments (
    dept_id INT AUTO_INCREMENT PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
);

ALTER TABLE departments AUTO_INCREMENT = 1;

CREATE TABLE roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(30),
    salary INT NOT NULL DEFAULT 0,
    dept VARCHAR(30) NOT NULL
);

ALTER TABLE roles AUTO_INCREMENT = 1;

CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(role_id),
    CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employees(employee_id) ON DELETE SET NULL
);


