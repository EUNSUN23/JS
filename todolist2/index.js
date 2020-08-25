const form = document.querySelector(".js-toDoForm");
const input = form.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");
let revise = false;
let ID = [];
let targetId;
let toDos = [];

const TODOS_LS = "todos";

function removeToDo(e) {
  const btn = e.currentTarget;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDo = toDos.filter((todo) => {
    return todo.id !== parseInt(li.id);
  });
  toDos = cleanToDo;
  const cleanId = ID.filter((id) => {
    return id !== parseInt(li.id);
  });
  ID = cleanId;
  saveToDos();
}

function reviseToDo(e) {
  const target = e.currentTarget.parentNode;
  targetId = target.id - 1;
  input.placeholder = toDos[targetId].text;
  revise = true;
  target.children[0].innerHTML = toDos[targetId].text;

  // e.currentTarget.parentNode.children[0].textContent = input.value;
}

function saveToDos() {
  //로컬스토리지에 todos저장. 새로고침해도 로컬스토리지에는 todos가 남아있음.
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const btn = document.querySelectorAll("img");
  var revBtn = btn[0].cloneNode(true);
  revBtn.classList.add(".rev");
  revBtn.addEventListener("click", reviseToDo);
  var delBtn = btn[1].cloneNode(true);
  delBtn.classList.add(".del");
  delBtn.addEventListener("click", removeToDo);
  const li = document.createElement("li");
  const newId = toDos.length + 1;
  li.id = newId;
  ID.push(newId);
  console.log(ID);
  const div = document.createElement("div");
  div.innerHTML = text;
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
  li.appendChild(div);
  li.appendChild(revBtn);
  li.appendChild(delBtn);
  toDoList.appendChild(li);
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS); //로컬스토리지가 어디냐..
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (todo) {
      paintToDo(todo.text);
    });
  }
}

function handleSubmit(e) {
  e.preventDefault();
  const currentValue = input.value;
  if (!revise) {
    paintToDo(currentValue);
    input.value = "";
  } else {
    //수정버튼 누르고 submit하는 경우
    toDos[targetId].text = input.value;
    targetId = "";
    saveToDos();
    location.reload(true);
  }
}

function init() {
  loadToDos();
  form.addEventListener("submit", handleSubmit);
}

init();
