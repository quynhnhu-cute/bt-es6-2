import Task from "../models/Task.js";

class TaskController {
  listTask = [];
  addNewTask = (content) => {
    let task = new Task(content, false);
    this.listTask.push(task);
    console.log(this.listTask);
  };

  finishTask = (index) => (this.listTask[index].status = true);

  removeTask = (index) => {
      console.log("before: ", this.listTask);
    this.listTask.splice(index, 1);
      console.log("after: ", this.listTask);
  }

  sortAscendingTask = () => this.listTask.sort((a, b) => a.content.localeCompare(b.content));

  sortDescending = () => {
      this.sortAscendingTask();
      this.listTask.reverse();
  }
}

export default TaskController;
