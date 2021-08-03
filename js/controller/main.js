import TaskController from "./TaskController.js";

const btnAdd = document.querySelector("#addItem");
const btnSortAscending = document.querySelector("#two");
const btnSortDescending = document.querySelector("#three");
// console.log(btnAdd);

const controller = new TaskController();

(getLocalStorage() != null) ? controller.listTask = getLocalStorage() : null;

const doTask = index => {
  controller.finishTask(index);
  setLocalStorage(controller.listTask);
  renderNewTask(getLocalStorage());
};


const deleteTask = index =>{
    controller.removeTask(index);
    setLocalStorage(controller.listTask);
  renderNewTask(getLocalStorage());
}
const renderNewTask = (listItem) => {
   
  let content = "";
  let contentFinish = "";
  listItem.map((item, index) => {
    if (item.status === false) {
      content += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${item.content}
            <span>
                <a href="" onclick="deleteTask('${index}')"><i class="bi bi-trash text-muted"></i></a>
                 <a href="" onclick="doTask('${index}')"><i class="bi bi-check-circle"></i></a>
               
            </span></li>`;
    } else {
      contentFinish += `
            <li class="list-group-item d-flex justify-content-between align-items-center text-success">
            
            <span>${item.content}</span>
        <span>
            <a href="" onclick="deleteTask('${index}')"> <i class="bi bi-trash text-muted"></i></a>
            <i class="bi bi-check-circle text-success"></i>
        </span></li>`;
    }
  });
  document.querySelector("#todo").innerHTML = content;
  document.querySelector("#completed").innerHTML = contentFinish;
};




getLocalStorage() != null ? renderNewTask(getLocalStorage()) : null;

btnAdd.onclick = function () {
  let content = document.querySelector("#newTask").value;
  console.log(content);
  if (content.trim().length > 0) {
    controller.addNewTask(content);
    setLocalStorage(controller.listTask);
    renderNewTask(controller.listTask);
    document.querySelector("#newTask").value = "";
  }
};

function setLocalStorage(listTask) {
  localStorage.setItem("LIST_TASK", JSON.stringify(listTask));
}

function getLocalStorage() {
  if (localStorage.getItem("LIST_TASK")) {
    return JSON.parse(localStorage.getItem("LIST_TASK"));
  }
}

btnSortAscending.onclick = () =>{
  controller.sortAscendingTask();
  setLocalStorage(controller.listTask);
  renderNewTask(getLocalStorage());
}

btnSortDescending.onclick = () =>{
  controller.sortDescending();
  setLocalStorage(controller.listTask);
  renderNewTask(getLocalStorage());
}
window.doTask = doTask;
window.deleteTask = deleteTask;