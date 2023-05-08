INSERT INTO departments (dept_name)
VALUES 
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO roles (job_title, salary, dept)
VALUES
    ('Sales Lead', '100000', 'Sales'),
    ('Salesperson', '80000', 'Sales'),
    ('Lead Engineer', '150000', 'Engineering'),
    ('Software Engineer', '120000', 'Engineering'),
    ('Account Manager', '160000', 'Finance'),
    ('Accountant', '125000', 'Finance'),
    ('Legal Team Lead', '250000', 'Legal'),
    ('Lawyer', '190000', 'Legal');

INSERT INTO employees (first_name, last_name, role_id)
VALUES
    ('John', 'Doe', 1),
    ('Mike', 'Chan', 2),
    ('Ashley', 'Rodriguez', 3),
    ('Kevin', 'Tupik', 4),
    ('Kunal', 'Singh', 5),
    ('Malia', 'Brown', 6),
    ('Sarah', 'Lourd', 7),
    ('Tom', 'Allen', 8);