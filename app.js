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
  tasks.push({ description, completed: false });
  console.log(`Tarea "${description}" añadida.`);
  displayTasks();
}

function deleteTask(index) {
  if (index >= 0 && index < tasks.length) {
    const deletedTask = tasks.splice(index, 1);
    console.log(`Tarea "${deletedTask[0].description}" eliminada.`);
  } else {
    console.log('Índice de tarea no válido.');
  }
  displayTasks();
}

function completeTask(index) {
  if (index >= 0 && index < tasks.length) {
    tasks[index].completed = true;
    console.log(`Tarea "${tasks[index].description}" marcada como completada.`);
  } else {
    console.log('Índice de tarea no válido.');
  }
  displayTasks();
}

function promptForAction() {
  rl.question('Elije una acción (1 para añadir tarea, 2 para eliminar tarea, 3 para completar tarea, 0 para salir): ', (choice) => {
    if (choice === '1') {
      rl.question('Ingrese la descripción de la tarea: ', (description) => {
        addTask(description);
        promptForAction();
      });
    } else if (choice === '2') {
      rl.question('Ingrese el número de la tarea que desea eliminar: ', (index) => {
        deleteTask(parseInt(index) - 1);
        promptForAction();
      });
    } else if (choice === '3') {
      rl.question('Ingrese el número de la tarea que desea marcar como completada: ', (index) => {
        completeTask(parseInt(index) - 1);
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
