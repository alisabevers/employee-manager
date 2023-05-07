INSERT INTO departments (dept_id, name)
VALUES 
    (1, 'Sales'),
    (2, 'Engineering'),
    (3, 'Finance'),
    (4, 'Legal');

INSERT INTO roles (role_id, job_title, dept)
VALUES
    (1, 'Sales Lead', 'Sales'),
    (2, 'Salesperson', 'Sales'),
    (3, 'Lead Engineer', 'Engineering'),
    (4, 'Software Engineer', 'Engineering'),
    (5, 'Account Manager', 'Finance'),
    (6, 'Accountant', 'Finance'),
    (7, 'Legal Team Lead', 'Legal'),
    (8, 'Lawyer', 'Legal');

INSERT INTO employees (first_name, last_name, job_title, dept, salary)
VALUES
    ('John', 'Doe', 'Sales Lead', 'Sales', '100000'),
    ('Mike', 'Chan', 'Salesperson', 'Sales', '80000'),
    ('Ashley', 'Rodriguez', 'Lead Engineer', 'Engineering', '150000'),
    ('Kevin', 'Tupik', 'Software Engineer', 'Engineering', '120000'),
    ('Kunal', 'Singh', 'Account Manager', 'Finance', '160000'),
    ('Malia', 'Brown', 'Accountant', 'Finance', '125000'),
    ('Sarah', 'Lourd', 'Legal Team Lead', 'Legal', '250000'),
    ('Tom', 'Allen', 'Lawyer', 'Legal', '190000');

INSERT INTO managers (manager)
VALUES
    ('John Doe'),
    ('Ashley Rodriguez'),
    ('Kunal Singh'),
    ('Sarah Lourd');