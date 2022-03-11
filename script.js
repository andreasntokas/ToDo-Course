// Selectors
const appElement = document.querySelector('#app');

/* <form>
    <input class="todo-input" type="text" />
      <button class="todo-button" type="submit">
        <i class="fas fa-plus-square"></i>
      </button>
      <div class="select">
        <select name="todos" class="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
    <div class="todo-container">
      <ul class="todo-list"></ul>
    </div> */
// UI
const todoForm = document.createElement('form');
const todoInput = document.createElement('input');
todoInput.classList.add('todo-input');
todoInput.type = 'text';
todoForm.appendChild(todoInput);
const todoButton = document.createElement('button');
todoButton.classList.add('todo-button');
todoButton.innerHTML = '<i class="fas fa-plus-square"></i>';
todoForm.appendChild(todoButton);
const todoSelect = document.createElement('div');
todoSelect.classList.add('select');
const filterOption = document.createElement('select');
filterOption.name = 'todos';
filterOption.classList.add('filter-todo');
todoSelect.appendChild(filterOption);
todoForm.appendChild(todoSelect);
const todoFirstOpt = document.createElement('option');
todoFirstOpt.value = 'all';
todoFirstOpt.text = 'All';
filterOption.appendChild(todoFirstOpt);
const todoSecondOpt = document.createElement('option');
todoSecondOpt.value = 'completed';
todoSecondOpt.text = 'Completed';
filterOption.appendChild(todoSecondOpt);
const todoThirdOpt = document.createElement('option');
todoThirdOpt.value = 'uncompleted';
todoThirdOpt.text = 'Uncompleted';
filterOption.appendChild(todoThirdOpt);
const todoContainer = document.createElement('div');
todoContainer.classList.add('todo-container');
const todoList = document.createElement('ul');
todoList.classList.add('todo-list');
todoContainer.appendChild(todoList);
appElement.appendChild(todoForm);
appElement.appendChild(todoContainer);

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
