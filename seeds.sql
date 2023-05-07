INSERT INTO departments (dept_id, name)
VALUES 
    (1, 'Sales'),
    (2, 'Engineering'),
    (3, 'Finance'),
    (4, 'Legal');

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

INSERT INTO employees (first_name, last_name, job_title_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Lourd', 7, NULL),
    ('Tom', 'Allen', 8, 7);