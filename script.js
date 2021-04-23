// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

// Event Listeners
document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", checkBtn);

// Functions
function addTodo(e) {
  // Create todo <div>
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create todo-item <li>
  const todoItem = document.createElement("li");
  todoItem.innerText = todoInput.value;
  todoItem.classList.add("todo-item");
  todoDiv.appendChild(todoItem);

  // Add Todo to Local Storage
  saveLocalTodos(todoInput.value);

  // Create check <button>
  const completeBtn = document.createElement("button");
  completeBtn.innerHTML = 'OK';
  completeBtn.classList.add("complete-btn");
  todoDiv.appendChild(completeBtn);

  // Create trash <button>
  const trashBtn = document.createElement("button");
  trashBtn.innerHTML = 'DEL';
  trashBtn.classList.add("trash-btn");
  todoDiv.appendChild(trashBtn);

  // Append to list
  todoList.appendChild(todoDiv);

  // Clear todo-input value
  todoInput.value = "";
}

function checkBtn(e) {
  const item = e.target;

  if (item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getLocalTodos() {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function (todo) {
    // Create todo <div>
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create todo-item <li>
    const todoItem = document.createElement("li");
    todoItem.innerText = todo;
    todoItem.classList.add("todo-item");
    todoDiv.appendChild(todoItem);

    // Create check <button>
    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = 'OK';
    completeBtn.classList.add("complete-btn");
    todoDiv.appendChild(completeBtn);

    // Create trash <button>
    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = 'DEL';
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);

    // Append to list
    todoList.appendChild(todoDiv);

    // Clear todo-input value
    todoInput.value = "";
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerHTML;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}