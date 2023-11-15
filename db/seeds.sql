INSERT INTO department (department_name)
VALUES
('Grand Admiral'),
('Admiral'),
('General'),
('Captain'),
('Sargent'),
('Private')

INSERT INTO roles (title, salary, department_id)
VALUES
('Legatus', 250000, 1),
('Praetorian', 200000, 2),
('Completionist', 150000, 3),
('Wing Commander', 100000, 4),
('Space Marshal', 50000, 5),
('Scout', 30000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Grand Admiral', 'Chris Roberts', 1, NULL),
('Admiral', 'Jared', 2, 1),
('General', 'Bone', 3, 2),
('Captain', 'Hawkeye', 4, 3),
('Sir', 'Sargent', 5, 4),
('Private', 'Parts', 6, 5);