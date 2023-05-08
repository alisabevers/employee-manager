INSERT INTO departments (dept_name)
VALUES 
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO roles (role_id, job_title, salary, dept)
VALUES
    (1, 'Sales Lead', '100000', 'Sales'),
    (2, 'Salesperson', '80000', 'Sales'),
    (3, 'Lead Engineer', '150000', 'Engineering'),
    (4, 'Software Engineer', '120000', 'Engineering'),
    (5, 'Account Manager', '160000', 'Finance'),
    (6, 'Accountant', '125000', 'Finance'),
    (7, 'Legal Team Lead', '250000', 'Legal'),
    (8, 'Lawyer', '190000', 'Legal');

INSERT INTO employees (first_name, last_name, title, manager_id)
VALUES
    ('John', 'Doe', 'Sales Lead', NULL),
    ('Mike', 'Chan', 'Salesperson', 1),
    ('Ashley', 'Rodriguez', 'Lead Engineer', NULL),
    ('Kevin', 'Tupik', 'Software Engineer', 3),
    ('Kunal', 'Singh', 'Account Manager', NULL),
    ('Malia', 'Brown', 'Accountant', 5),
    ('Sarah', 'Lourd', 'Legal Team Lead', NULL),
    ('Tom', 'Allen', 'Lawyer', 7);