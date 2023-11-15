const inquirer = require('inquirer');
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'employee_db',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database');
    start();
});

function start() {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
                case 'Exit':
                    connection.end();
                    break;
            }
        });
}

function viewAllDepartments() {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

function viewAllRoles() {
    connection.query(
        'SELECT roles.id, roles.title, roles.salary, department_name AS department FROM roles LEFT JOIN department ON roles.department_id = department.id',
        (err, res) => {
            if (err) throw err;
            console.table(res);
            start();
        }
    );
}

function viewAllEmployees() {
    connection.query(
        'SELECT employee.id, employee.first_name, employee.last_name, roles.title, department_name AS department, roles.salary, CONCAT(employee.first_name, " ", employee.last_name) employee FROM employee LEFT JOIN roles ON employee.roles_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id;',
        (err, res) => {
            if (err) throw err;
            console.table(res);
            start();
        }
    );
}

function addDepartment() {
  inquirer
    .prompt({
      name: 'name',
      type: 'input',
      message: 'Enter the name of the department:',
    })
    .then((answer) => {
      connection.query(
        'INSERT INTO department SET ?',
        { department_name: answer.name },
        (err, res) => {
          if (err) throw err;
          console.log('Department added successfully!');
          start();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: 'Enter the title of the role:',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'Enter the salary of the role:',
      },
      {
        name: 'department',
        type: 'input',
        message: 'Enter the department ID for the role:',
      },
    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO roles SET ?',
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department,
        },
        (err, res) => {
          if (err) throw err;
          console.log('Role added successfully!');
          start();
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: 'firstName',
        type: 'input',
        message: "Enter the employee's first name:",
      },
      {
        name: 'lastName',
        type: 'input',
        message: "Enter the employee's last name:",
      },
      {
        name: 'roleId',
        type: 'input',
        message: "Enter the employee's role ID:",
      },
      {
        name: 'managerId',
        type: 'input',
        message: "Enter the employee's manager ID:",
      },
    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO employee SET ?',
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          roles_id: answer.roleId,
          manager_id: answer.managerId,
        },
        (err, res) => {
          if (err) throw err;
          console.log('Employee added successfully!');
          start();
        }
      )
    })
};

function updateEmployeeRole() {
  inquirer
    .prompt([
    {
      name: 'employeeId',
      type: 'input',
      message: "Enter the employee's new role ID:",
    },
    {
      name: 'newRoleId',
      type: 'input',
      message: "Enter the employee's Id that you want to change:",
    },
  ])
  .then((answer) => {
    connection.query(
      'UPDATE employee SET roles_id = ? WHERE id = ?',
      [answer.employeeId, answer.newRoleId],
      (err, res) => {
        if (err) throw err;
        console.log('Employee successfully updated!');
        start();
      }
    )
  })
};