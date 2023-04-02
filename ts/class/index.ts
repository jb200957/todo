let BACKEND_ROOT_URL = "http://localhost:5000";
import { Task } from "../../js-build/class/task.js";
import { Todos } from "../../js-build/class/Todos.js";
const list = <HTMLUListElement>document.getElementById("todolist");
const input = <HTMLInputElement>document.querySelector("#newtodo");
input.disabled = true;

Todos.getTasks()
  .then((tasks: Array<Task>) => {
    tasks.forEach((task) => {
      renderTask(task);
    });
    input.disabled = false;
  })
  .catch((error) => {
    alert(error);
  });

const renderTask = (text: Task) => {
  const list_item = document.createElement("li");
  list_item.setAttribute("class", "list-group-item");
  list_item.innerHTML = Task.text;
  list.append(list_item);
};

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const text = input.value.trim();
    if (text !== "") {
      Todos.addTasks(text).then((task) => {
        input.value = "";
        input.focus();
        renderTask(<Task>task);
      });
    }
    event.preventDefault();
  }
});
