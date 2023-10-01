const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tasks = [];

function displayTasks() {
  console.log('==== Lista de Tareas ====');
  tasks.forEach((task, index) => {
    console.log(`${index + 1}. [${task.completed ? 'X' : ' '}] ${task.description}`);
  });
  console.log('========================');
}

function addTask(description) {
  return new Promise((resolve, reject) => {
    tasks.push({ description, completed: false });
    console.log(`Tarea "${description}" añadida.`);
    displayTasks();
    resolve();
  });
}

function deleteTask(index) {
  return new Promise((resolve, reject) => {
    if (index >= 0 && index < tasks.length) {
      const deletedTask = tasks.splice(index, 1);
      console.log(`Tarea "${deletedTask[0].description}" eliminada.`);
      displayTasks();
      resolve();
    } else {
      console.log('Índice de tarea no válido.');
      reject();
    }
  });
}

function completeTask(index) {
  return new Promise((resolve, reject) => {
    if (index >= 0 && index < tasks.length) {
      tasks[index].completed = true;
      console.log(`Tarea "${tasks[index].description}" marcada como completada.`);
      displayTasks();
      resolve();
    } else {
      console.log('Índice de tarea no válido.');
      reject();
    }
  });
}

function promptForAction() {
  rl.question('Elije una acción (1 para añadir tarea, 2 para eliminar tarea, 3 para completar tarea, 0 para salir): ', async (choice) => {
    if (choice === '1') {
      rl.question('Ingrese la descripción de la tarea: ', async (description) => {
        await addTask(description);
        promptForAction();
      });
    } else if (choice === '2') {
      rl.question('Ingrese el número de la tarea que desea eliminar: ', async (index) => {
        await deleteTask(parseInt(index) - 1);
        promptForAction();
      });
    } else if (choice === '3') {
      rl.question('Ingrese el número de la tarea que desea marcar como completada: ', async (index) => {
        await completeTask(parseInt(index) - 1);
        promptForAction();
      });
       } else if (choice === '0') {
      rl.close();
    } else {
      console.log('Acción no válida.');
      promptForAction();
    }
  });
}

console.log('Bienvenido a la Lista de Tareas.');

promptForAction();
