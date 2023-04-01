let BACKEND_ROOT_URL = "http://localhost:5000";
const list = <HTMLUListElement>document.getElementById("todolist");
const input = <HTMLInputElement>document.querySelector("#newtodo");
input.disabled = true;

fetch(BACKEND_ROOT_URL)
  .then((response) => response.json())
  .then(
    (response) => {
      response.result.forEach((node) => {
        renderTask(node.description);
      });
      input.disabled = false;
    },
    (error) => {
      alert(error);
    }
  );

const renderTask = (text) => {
  const list_item = document.createElement("li");
  list_item.setAttribute("class", "list-group-item");
  list_item.innerHTML = text;
  list.append(list_item);
};

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const text = input.value.trim();
    console.log("this is keypress1", text);
    if (text !== "") {
      const json = JSON.stringify({ description: text });
      fetch(BACKEND_ROOT_URL + "/new", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: json,
      })
        .then((response) => response.json())
        .then(
          (response) => {
            renderTask(text);
            input.value = "";
          },
          (error) => {
            alert(error);
          }
        );
    }
  }
});
