DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL(10, 2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE
    SET
        NULL
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    roles_id INT,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE,
    FOREIGN KEY (roles_id) REFERENCES roles(id) ON DELETE
    SET
        NULL
);

-- SELECT 
--     employee.id,
--     employee.first_name,
--     employee.last_name,
--     roles.title,
--     department_name AS department,
--     roles.salary,
--     CONCAT(employee.first_name, " ", employee.last_name) AS employee
-- FROM 
--     employee
-- LEFT JOIN 
--     roles ON employee.roles_id = roles.id
-- LEFT JOIN 
--     department ON roles.department_id = department.id
-- LEFT JOIN 
--     employee manager ON employee.manager_id = manager.id;