"use strict";
import { Allmethods } from "./interface/interface";
const addTask = document.getElementById("add-task")! as HTMLButtonElement;
const taskContainer = document.getElementById(
  "task-container"
)! as HTMLDivElement;
const inputTask = document.getElementById("input-task")! as HTMLInputElement;
const intro = document.querySelector(".intro_text")! as HTMLDivElement;
const text = document.querySelector("#text")! as HTMLDivElement;
intro.classList.remove("hidden");
let marker = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
<path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
<path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
</svg>`;
let delMarker = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
</svg>`;
let html: string[];
let delDiv: HTMLDivElement;
class Todo implements Allmethods {
  delBtn!: HTMLButtonElement;
  cancelBtn!: HTMLButtonElement;
  div!: HTMLDivElement;
  li!: HTMLElement;
  clearID!: number;
  constructor() {
    this.animeText();
    this.updateUI();
    this.deleteItem();
    this.cancelItem();
    addTask.addEventListener("click", this.processData.bind(this));
  }
   animeText() {
    this.clearID = setInterval(() => {
      text.classList.toggle("animate__hinge");
    }, 3000);
  }
   removeIntro() {
    if (intro !== null) {
      intro.classList.add("hidden");
      clearInterval(this.clearID);
    } else {
      return;
    }
  }
   processData() {
    if (inputTask.value !== "") {
      this.removeIntro();
      if (taskContainer.classList.contains("hidTaskBar")) {
        taskContainer.classList.remove("hidTaskBar");
      }
      this.div = document.createElement("div");
      this.div.classList.add("task");
      this.li = document.createElement("li");
      this.li.innerText = inputTask.value;
      const div2 = document.createElement("div");
      this.cancelItem();
      this.deleteItem();
      this.div.appendChild(this.li);
      div2.appendChild(this.cancelBtn);
      div2.appendChild(this.delBtn);
      this.div.appendChild(div2);
      taskContainer.append(this.div);
      this.addTolocalStorage(this.li.innerText);
      inputTask.value = "";
    } else {
      alert("enter input field");
    }
  }
 cancelItem() {
    this.cancelBtn = document.createElement("button");
    this.cancelBtn.insertAdjacentHTML("afterbegin", marker);
    this.cancelBtn.classList.add("check");
    this.cancelBtn.addEventListener("click", this.stroke.bind(this));
  }
 deleteItem() {
    this.delBtn = document.createElement("button");
    this.delBtn.insertAdjacentHTML("afterbegin", delMarker);
    this.delBtn.classList.add("del");
    this.delBtn.addEventListener("click", this.removeData.bind(this));
  }
 removeData(e: Event) {
     const elem = e.target as HTMLDivElement;
    delDiv = elem.closest(".task")!;
    if (taskContainer.children.length === 2) {
      intro.classList.remove("hidden");
      taskContainer.classList.add("hidTaskBar");
      this.delFromLocalStorage();
      delDiv.remove();
    } else {
      this.delFromLocalStorage();
      delDiv.style.transform = "rotate(-1deg)";
      setTimeout(() => {
        delDiv.remove();
      }, 500);
    }
  }
 stroke(e: Event) {
    const li = document.querySelector("li")!;
    const newevent = e.target as HTMLLIElement;
    //newevent.parentElement.parentElement.parentElement
    if (newevent === li) {
      const li2 =
        newevent.parentElement!.parentElement!.parentElement!.querySelector(
          "li"
        );
      if (newevent.matches(".bi")) {
        li.style.textDecoration = "line-through";
      }
    }
  }
 addTolocalStorage(todo: string) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos") as string);
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }

 updateUI() {
    window.addEventListener("load", () => {
      html = JSON.parse(localStorage.getItem("todos") as string);
      if (html !== null && html.length > 0) {
        this.removeIntro();
      }
      if (html !== null) {
        html.forEach((arr) => {
          this.div = document.createElement("div");
          this.div.classList.add("task");
          this.li = document.createElement("li");
          this.li.innerText = arr;
          const div2 = document.createElement("div");
          this.cancelItem();
          this.deleteItem();
          this.div.appendChild(this.li);
          div2.appendChild(this.cancelBtn);
          div2.appendChild(this.delBtn);
          this.div.appendChild(div2);
          taskContainer.append(this.div);
          inputTask.value = "";
        });
      }
    });
  }
  delFromLocalStorage() {
    const innerText = delDiv.querySelector('li')!.innerText

    const storedData = JSON.parse(localStorage.getItem("todos") as string);
    storedData.splice(storedData.indexOf(innerText), 1);
    localStorage.setItem("todos", JSON.stringify(storedData));
  }
}
const todoApp = new Todo();
