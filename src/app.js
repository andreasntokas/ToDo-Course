const appElement = document.querySelector('#app');

// STATE

const state = {
  value: '',
  todoList: [],
  show: 'ALL',
};

// LOGIC

function updateInput(event) {
  state.value = event.target.value;
}

function addTodo(event) {
  // prevent default
  event.preventDefault();
  // creating a new todo object
  const newTodo = {
    id: state.todoList.length,
    text: state.value,
    completed: false,
  };

  // adding todo to state
  state.todoList.push(newTodo);
  state.value = '';

  localStorage.setItem('todo-list', JSON.stringify(state.todoList));

  render(state);
}

function removeTodo(id) {
  state.todoList = state.todoList.filter((todo) => todo.id !== id);
  localStorage.setItem('todo-list', JSON.stringify(state.todoList));
  render(state);
}

function updateTodo(id) {
  state.todoList = state.todoList.map((todo) => {
    if (todo.id === id) {
      todo.completed = !todo.completed;
    }
    return todo;
  });
  localStorage.setItem('todo-list', JSON.stringify(state.todoList));
  render(state);
}

function applyFilter(event) {
  state.show = event.target.value;
  console.log(state);
  render(state);
}

function preloadTodos() {
  const todoList =
    localStorage.getItem('todo-list') === null
      ? []
      : JSON.parse(localStorage.getItem('todo-list'));
  state.todoList = todoList;
  render(state);
}

function clear(element) {
  element.innerHTML = '';
}

function render(state) {
  // Clear previous DOM tree
  clear(appElement);

  // Todo Form
  const todoForm = document.createElement('form');

  // Todo Input
  const todoInput = document.createElement('input');
  todoInput.classList.add('todo-input');
  todoInput.type = 'text';
  todoInput.addEventListener('keydown', updateInput);

  todoForm.appendChild(todoInput);

  // Todo Button
  const todoButton = document.createElement('button');
  todoButton.classList.add('todo-button');
  todoButton.innerHTML = '<i class="fas fa-plus-square"></i>';
  todoButton.addEventListener('click', addTodo);

  todoForm.appendChild(todoButton);

  // Filter selection.
  const todoSelect = document.createElement('div');
  todoSelect.classList.add('select');

  const filterOption = document.createElement('select');
  filterOption.name = 'todos';
  filterOption.classList.add('filter-todo');

  todoSelect.appendChild(filterOption);
  todoForm.appendChild(todoSelect);

  ['All', 'Completed', 'Uncompleted'].forEach((filterValue) => {
    const elem = document.createElement('option');
    elem.value = filterValue.toUpperCase();
    elem.text = filterValue;
    elem.selected = state.show === filterValue.toUpperCase();
    filterOption.appendChild(elem);
  });

  filterOption.addEventListener('change', applyFilter);

  // Todo Container
  const todoContainer = document.createElement('div');
  todoContainer.classList.add('todo-container');

  // Todo List
  const todoList = document.createElement('ul');
  todoList.classList.add('todo-list');
  todoContainer.appendChild(todoList);

  let todos;

  switch (state.show) {
    case 'COMPLETED':
      todos = state.todoList.filter((todo) => todo.completed);
      break;
    case 'UNCOMPLETED':
      todos = state.todoList.filter((todo) => !todo.completed);
      break;
    default:
      todos = state.todoList;
  }

  [...todos].reverse().forEach((todo) => {
    // Wrapper todo element.
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // Display new Todo.
    const newTodo = document.createElement('li');
    newTodo.innerText = todo.text;
    newTodo.classList.add('todo-item');

    if (todo.completed) {
      newTodo.classList.add('completed');
    }

    // Completed Button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"><i>';
    completedButton.classList.add('complete-btn');
    completedButton.addEventListener('click', () => updateTodo(todo.id));

    // Trash Button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"><i>';
    trashButton.classList.add('trash-btn');
    trashButton.addEventListener('click', () => removeTodo(todo.id));

    todoDiv.appendChild(newTodo);
    todoDiv.appendChild(completedButton);
    todoDiv.appendChild(trashButton);
    todoList.appendChild(todoDiv);
  });

  // Append to global root element.
  appElement.appendChild(todoForm);
  appElement.appendChild(todoContainer);
}

document.addEventListener('DOMContentLoaded', preloadTodos);
