# Todo List Web App Documentation

## Project Overview

**Todo List Web App** is a simple frontend project built with **HTML, CSS, and JavaScript**. It allows users to **create, read, update, and delete (CRUD)** tasks with persistent storage using **localStorage**. The app is designed to be **interactive, responsive, and visually appealing** with hover effects and modal editing.

**Features:**
- Add tasks with a **title** and **description**
- Mark tasks as **complete**
- **Edit** existing tasks in a modal popup
- **Delete** tasks
- Data persistence using **localStorage**
- Interactive UI with hover and blur effects

---

## File Structure

todo-app/
│

├─ index.html          # Main HTML file

├─ style.css           # Styling for the app

└─ script.js           # JavaScript functionality

---

## HTML Structure (`index.html`)

- **Input Section:**
  - `#inpBox` – input for task title
  - `#inpBoxDesc` – input for task description
  - `#btn` – button to add a task

- **Task Output Section:**
  - `#output` – container for dynamically rendered tasks

- **Edit Modal:**
  - `#bgblur` – blur overlay for modal background
  - `#editContainer` – container for editing tasks
    - `.editTitle` – input for editing task title
    - `.editDesc` – input for editing task description
    - `.editButton` – button to save edits

---

## CSS Highlights (`style.css`)

- **Layout:** Flexbox for centering and column alignment.
- **Task Cards (`.divCont`):**
  - Shadow effect
  - Hover animation (scale + box-shadow)
- **Buttons:**
  - Colored for function (delete = red, complete = green, edit = yellow/blue)
  - Hover effect for interactivity
- **Edit Modal (`#bgblur`):**
  - Backdrop blur
  - Positioned in center
  - Shows only when editing a task

---

## JavaScript Functionality (`script.js`)

### 1. Variables & Initial Setup
```javascript
let arr = JSON.parse(localStorage.getItem("tasks")) || [];
const btn = document.querySelector("#btn");
const input = document.querySelector("#inpBox");
const inputDesc = document.querySelector("#inpBoxDesc");
```

- `arr` – array storing all tasks (retrieved from localStorage if available).
- `btn`, `input`, `inputDesc` – DOM references for user interaction.

### 2. Add Task
```javascript
function addTask() {
  let inputValue = input.value.trim();
  let inputDescValue = inputDesc.value.trim();
  if (!inputValue || !inputDescValue) return;
  saveTask(inputValue, inputDescValue);
  input.value = "";
  inputDesc.value = "";
}
```

- Validates input
- Calls `saveTask()` to add the task
- Clears input fields

### 3. Save Task
```javascript
function saveTask(title, desc) {
  const task = { title, description: desc, completed: false };
  arr.push(task);
  localStorage.setItem("tasks", JSON.stringify(arr));
  renderTasks();
}
```

- Adds a new task to `arr`
- Stores updated array in **localStorage**
- Calls `renderTasks()` to update UI

### 4. Render Tasks
```javascript
function renderTasks() {
  let output = document.querySelector("#output");
  output.innerHTML = "";
  arr.forEach((element, index) => {
    let div = document.createElement("div");
    div.className = "divCont";
    if (element.completed) div.classList.add("completed");

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

    div.append(title, desc, completeBtn, deleteBtn, editBtn);
    output.appendChild(div);
  });
}
```

- Dynamically creates **task cards**
- Adds **buttons for delete, complete, edit**
- Applies **completed styling** if task is done

### 5. Edit Task
```javascript
function editTaskPanel(element, index) {
  const editPanel = document.querySelector("#bgblur");
  const editCont = document.querySelector("#editContainer");
  editPanel.classList.toggle("bgblur");
  editCont.style.display = "flex";

  let editTitle = document.querySelector(".editTitle");
  let editDesc = document.querySelector(".editDesc");
  editTitle.value = element.title;
  editDesc.value = element.description;

  const editButton = document.querySelector(".editButton");
  editButton.onclick = () => {
    arr[index].title = editTitle.value;
    arr[index].description = editDesc.value;
    localStorage.setItem("tasks", JSON.stringify(arr));
    editCont.style.display = "none";
    editPanel.classList.toggle("bgblur");
    renderTasks();
  };
}
```

### 6. Delete Task
```javascript
function deleteTask(index) {
  arr.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(arr));
  renderTasks();
}
```

### 7. Complete Task
```javascript
function completeTask(index) {
  arr[index].completed = !arr[index].completed;
  localStorage.setItem("tasks", JSON.stringify(arr));
  renderTasks();
}
```

### 8. Close Modal by Clicking Outside
```javascript
document.addEventListener("click", (e) => {
  if (e.target === editPanel) {
    const editCont = document.querySelector("#editContainer");
    editPanel.classList.toggle("bgblur");
    editCont.style.display = "none";
    renderTasks();
  }
});
```

- Allows closing the edit modal by clicking **outside the panel**

---
