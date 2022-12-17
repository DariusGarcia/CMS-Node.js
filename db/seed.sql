use employees_db;

INSERT INTO department (name) VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role(title, salary, department_id) VALUES
    ('Sales Manager', 140000, 1),
    ('Sales Rep.', 75000, 1),
    ('Project Manager', 120000, 2),
    ('Software Developer', 115000, 2),
    ('Backend Engineer', 100000, 3),
    ('Analyst', 105000, 3),
    ('Accountant', 500000, 4),
    ('Lawyer', 220000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
    ('Aaron', 'Garcia', 1, NULL),
    ('Daniel', 'Anthony', 2, 1),
    ('Brandon', 'Ronny', 3, NULL),
    ('Kevin', 'Seed', 4, 3),
    ('Matt', 'Kershaw', 5, NULL),
    ('Ron', 'Apple', 6, 5),
    ('Jason', 'John', 7, NULL),
    ('Jack', 'James', 8, 7);
