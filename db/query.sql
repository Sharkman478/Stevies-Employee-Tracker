INSERT INTO department (department_name)
VALUES
('')

SELECT 
    department.department_name AS department, roles.title AS roles, department.id AS department_id, CONCAT(employee.first_name, ' ', employee.last_name) AS employee
FROM department

LEFT JOIN roles roles ON roles.department_id = department.id
LEFT JOIN employee employee ON employee.roles_id = roles.id
ORDER BY department.id;