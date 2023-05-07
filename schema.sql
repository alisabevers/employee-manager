DROP DATABASE IF EXISTS employee_manager_db;
CREATE DATABASE employee_manager_db;

USE employee_manager_db;

CREATE TABLE departments (
    dept_id INT NOT NULL,
    dept_name VARCHAR(30) NOT NULL PRIMARY KEY
);

CREATE TABLE roles (
    role_id INT PRIMARY KEY NOT NULL,
    job_title VARCHAR(30),
    salary INT NOT NULL DEFAULT 0,
    dept VARCHAR(30) NOT NULL,
    FOREIGN KEY (dept) REFERENCES departments(dept_name)
);

CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    job_title_id INT,
    manager_id INT,
    FOREIGN KEY (job_title_id) REFERENCES roles(role_id),
    FOREIGN KEY (manager_id) REFERENCES employees(employee_id) ON DELETE SET NULL
);

