var TodoForm = document.querySelector(".form");
var TodoWrite = document.querySelector(".sub");
var Add = document.querySelector(".add");
var Rewrite = document.querySelector(".rewrite");
var Todo = document.querySelector(".todo");

TodoWrite.addEventListener("submit", function (e) {
  e.preventDefault();
  var contents = TodoWrite.value;
  function MakeList() {
    var TodoList = document.createElement(li);
    TodoList.textContent = contents;
    Todo.appendChild("TodoList");
    console.log(TodoList.textContent);
  }
  MakeList();
});
