// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Functions
function saveLocalTodos(todo) {
  const todos =
    localStorage.getItem('todos') === null
      ? []
      : JSON.parse(localStorage.getItem('todos'));
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function removeLocalTodos(todo) {
  const todos =
    localStorage.getItem('todos') === null
      ? []
      : JSON.parse(localStorage.getItem('todos'));
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  const todos =
    localStorage.getItem('todos') === null
      ? []
      : JSON.parse(localStorage.getItem('todos'));
  todos.forEach((todo) => {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    // Add todo to localStorage
    // Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"><i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    // Check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"><i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    // Append to list
    todoList.appendChild(todoDiv);
  });
}
document.addEventListener('DOMContentLoaded', getTodos);

function addTodo(event) {
  // Prevent form from submitting
  event.preventDefault();
  // ToDo DIV
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  // Create LI
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  // Add todo to localStorage
  saveLocalTodos(todoInput.value);
  // Check mark button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"><i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);
  // Check trash button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"><i>';
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);
  // Append to list
  todoList.appendChild(todoDiv);
  // Clear Todo INPUT VALUE
  todoInput.value = '';
}
todoButton.addEventListener('click', addTodo);

function deleteCheck(e) {
  const item = e.target;
  // DELETE TODO
  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    removeLocalTodos(todo);
    // Animation
    todo.classList.add('fall');
    todo.addEventListener('transitionend', () => {
      todo.remove();
    });
  }
  // CHECK MARK
  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}
todoList.addEventListener('click', deleteCheck);

function filterToDo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case 'completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'uncompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      default:
        todo.style.display = 'flex';
        break;
    }
  });
}
filterOption.addEventListener('change', filterToDo);
