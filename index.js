"use strict";
const addTask = document.getElementById("add-task");
const taskContainer = document.getElementById("task-container");
const inputTask = document.getElementById("input-task");
const intro = document.querySelector(".intro_text");
const text = document.querySelector("#text");
intro.classList.remove("hidden");
let marker = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
<path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
<path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
</svg>`;
let delMarker = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
</svg>`;
let html;
let delDiv;
class Todo {
  delBtn;
  cancelBtn;
  div;
  li;
  clearID;
  constructor() {
    this._animeText();
    this._updateUI();
    this._deleteItem();
    this._cancelItem();
    addTask.addEventListener("click", this._processData.bind(this));
  }
  _animeText() {
    this.clearID = setInterval(() => {
      text.classList.toggle("animate__hinge");
    }, 3000);
  }
  _removeIntro() {
    if (intro !== null) {
      intro.classList.add("hidden");
      clearInterval(this.clearID);
    } else {
      return;
    }
  }
  _processData() {
    if (inputTask.value !== "") {
      this._removeIntro();
      if (taskContainer.classList.contains("hidTaskBar")) {
        taskContainer.classList.remove("hidTaskBar");
      }
      this.div = document.createElement("div");
      this.div.classList.add("task");
      this.li = document.createElement("li");
      this.li.innerText = inputTask.value;
      const div2 = document.createElement("div");
      this._cancelItem();
      this._deleteItem();
      this.div.appendChild(this.li);
      div2.appendChild(this.cancelBtn);
      div2.appendChild(this.delBtn);
      this.div.appendChild(div2);
      taskContainer.append(this.div);
      this._addTolocalStorage(this.li.innerText);
      inputTask.value = null;
    } else {
      alert("enter input field");
    }
  }
  _cancelItem() {
    this.cancelBtn = document.createElement("button");
    this.cancelBtn.insertAdjacentHTML("afterbegin", marker);
    this.cancelBtn.classList.add("check");
    this.cancelBtn.addEventListener("click", this._stroke.bind(this));
  }
  _deleteItem() {
    this.delBtn = document.createElement("button");
    this.delBtn.insertAdjacentHTML("afterbegin", delMarker);
    this.delBtn.classList.add("del");
    this.delBtn.addEventListener("click", this._removeData.bind(this));
  }
  _removeData(e) {
    delDiv = e.target.closest(".task");
    if (taskContainer.children.length === 2) {
      intro.classList.remove("hidden");
      taskContainer.classList.add("hidTaskBar");
    this._delFromLocalStorage();
    delDiv.remove()
    }else{
     this._delFromLocalStorage();
      delDiv.style.transform = 'rotate(-1deg)' 
      setTimeout(()=>{delDiv.remove()},500)
    }
  }
  _stroke(e) {
    const li =
      e.target.parentElement.parentElement.parentElement.querySelector("li");
    if (e.target.matches(".bi")) {
      li.style.textDecoration = "line-through";
    }
  }
  _addTolocalStorage(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  _updateUI() {
    window.addEventListener("load", () => {
      html = JSON.parse(localStorage.getItem("todos"));
      if (html !== null && html.length > 0) {
        this._removeIntro();
      }
      if (html !== null) {
        html.forEach((arr) => {
          this.div = document.createElement("div");
          this.div.classList.add("task");
          this.li = document.createElement("li");
          this.li.innerText = arr;
          const div2 = document.createElement("div");
          this._cancelItem();
          this._deleteItem();
          this.div.appendChild(this.li);
          div2.appendChild(this.cancelBtn);
          div2.appendChild(this.delBtn);
          this.div.appendChild(div2);
          taskContainer.append(this.div);
          inputTask.value = null;
        });
      }
    });
  }
  _delFromLocalStorage() {
    const innerText = delDiv.querySelector("li").innerText;
    const storedData = JSON.parse(localStorage.getItem("todos"));
    storedData.splice(storedData.indexOf(innerText), 1);
    localStorage.setItem("todos", JSON.stringify(storedData));
  }
}
const todoApp = new Todo();
