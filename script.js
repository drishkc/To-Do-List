let arr = JSON.parse(localStorage.getItem("tasks")) || [];
const btn = document.querySelector("#btn");
const input = document.querySelector("#inpBox");
const inputDesc = document.querySelector("#inpBoxDesc");

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

btn.addEventListener("click", () => {
  addTask();
});

function addTask() {
  let inputValue = input.value.trim();
  let inputDescValue = inputDesc.value.trim();
  console.log(inputValue);
  if (!inputValue || !inputDescValue) return;
  saveTask(inputValue, inputDescValue);
  input.value = "";
  inputDesc.value = "";
}

function saveTask(title, desc) {
  const task = {
    title: title,
    description: desc,
    completed: false,
  };

  arr.push(task);
  localStorage.setItem("tasks", JSON.stringify(arr));
  renderTasks();
}

function renderTasks() {
  let output = document.querySelector("#output");
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  output.innerHTML = "";

  arr.forEach((element, index) => {
    let div = document.createElement("div");

    let title = document.createElement("h3");
    title.innerText = element.title;

    let desc = document.createElement("p");
    desc.innerText = element.description;

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "delete";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.onclick = () => deleteTask(index);

    let completeBtn = document.createElement("button");
    completeBtn.innerText = "complete";
    completeBtn.classList.add("completeBtn");
    completeBtn.onclick = () => completeTask(index);

    let editBtn = document.createElement("button");
    editBtn.innerText = "edit";
    editBtn.classList.add("editBtn");
    editBtn.onclick = () => editTaskPanel(element, index);

    div.className = "divCont";

    if (element.completed) {
      div.classList.toggle("completed");
    }

    div.appendChild(title);
    div.appendChild(desc);
    div.appendChild(completeBtn);
    div.appendChild(deleteBtn);
    div.appendChild(editBtn);
    output.appendChild(div);
  });
}
const editPanel = document.querySelector("#bgblur");

function editTaskPanel(element, index) {
  const editPanel = document.querySelector("#bgblur");
  editPanel.classList.toggle("bgblur");

  let editTitle = document.querySelector(".editTitle");
  let editDesc = document.querySelector(".editDesc");

  editTitle.value = element.title;
  editDesc.value = element.description;

  const editButton = document.querySelector(".editButton");

  editButton.onclick = null;

  editButton.addEventListener("click", () => {
    arr[index].title = editTitle.value;
    arr[index].description = editDesc.value;
    localStorage.setItem("tasks", JSON.stringify(arr));
    editPanel.classList.toggle("bgblur");
    renderTasks();
  });
}
document.addEventListener("click", (e) => {
  if (e.target === editPanel) {
    editPanel.classList.toggle("bgblur");
  }
});
function deleteTask(index) {
  arr.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(arr));
  renderTasks();
}
function completeTask(index) {
  arr[index].completed = !arr[index].completed;
  localStorage.setItem("tasks", JSON.stringify(arr));
  renderTasks();
}
renderTasks();
