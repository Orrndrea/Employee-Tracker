const inquirer = require('inquirer');
const queries = require('./queries');

const mainMenu = async () => {
  const { action } = await inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Exit'
    ],
  });

  switch (action) {
    case 'View all departments':
      const departments = await queries.viewDepartments();
      console.table(departments);
      break;
    case 'View all roles':
      const roles = await queries.viewRoles();
      console.table(roles);
      break;
    case 'View all employees':
      const employees = await queries.viewEmployees();
      console.table(employees);
      break;
    case 'Add a department':
      const { deptName } = await inquirer.prompt({
        type: 'input',
        name: 'deptName',
        message: 'Enter the name of the department:'
      });
      await queries.addDepartment(deptName);
      console.log('Department added.');
      break;
    case 'Add a role':
      const { roleTitle, salary, deptId } = await inquirer.prompt([
        { type: 'input', name: 'roleTitle', message: 'Enter the role title:' },
        { type: 'input', name: 'salary', message: 'Enter the salary:' },
        { type: 'input', name: 'deptId', message: 'Enter the department ID:' }
      ]);
      await queries.addRole(roleTitle, salary, deptId);
      console.log('Role added.');
      break;
    case 'Add an employee':
      const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
        { type: 'input', name: 'firstName', message: 'Enter the employee\'s first name:' },
        { type: 'input', name: 'lastName', message: 'Enter the employee\'s last name:' },
        { type: 'input', name: 'roleId', message: 'Enter the role ID:' },
        { type: 'input', name: 'managerId', message: 'Enter the manager ID (or leave blank if none):', default: null }
      ]);
      await queries.addEmployee(firstName, lastName, roleId, managerId);
      console.log('Employee added.');
      break;
    case 'Update an employee role':
      const { empId, newRoleId } = await inquirer.prompt([
        { type: 'input', name: 'empId', message: 'Enter the employee ID:' },
        { type: 'input', name: 'newRoleId', message: 'Enter the new role ID:' }
      ]);
      await queries.updateEmployeeRole(empId, newRoleId);
      console.log('Employee role updated.');
      break;
    case 'Exit':
      process.exit();
  }
  mainMenu();
};

mainMenu();
