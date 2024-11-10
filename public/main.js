const getTodos = document.querySelector("#btn");
const getTodo = document.querySelector("#get-todo-form");
const postTodo = document.querySelector("#create-todo-form");
const putTodo = document.querySelector("#update-todo-form");
const deleteTodo = document.querySelector("#delete-todo-form");
let output = document.getElementById("output");

function clientErr(id) {
  const clientErr = document.querySelector(id);
  clientErr.textContent = "No such data!";
  setTimeout(() => {
    clientErr.textContent = "";
  }, 2000);
}

// GET /todos
async function readTodos() {
  const res = await fetch("http://localhost:4000/todos");
  if (!res.ok) {
    console.log("Error fetching data");
  }

  const todos = await res.json();

  output.innerHTML = "";
  if (todos.length === 0) {
    const h2 = document.createElement("h2");
    const label = document.createElement("label");

    label.setAttribute("for", "title2");

    label.innerText = "Click Here to add one";
    h2.innerText = "Oops! There are no todos";

    label.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    output.append(h2, label);
  }

  todos.forEach((todo) => {
    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");

    h3.innerText = todo.title;
    p.innerText = todo.detail;
    li.append(h3, p);

    li.addEventListener("click", () => {
      const res = fetch(`http://localhost:4000/todos/delete/${h3.innerText}`, {
        method: "DELETE",
      }).then((res) => {
        if (!res.ok) {
          console.log("There might be an Error on the server");
        }

        readTodos();
      });
    });

    output.append(li);
  });
}

// GET /todos/:name
function readTodo(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const title = formData.get("title");

  fetch(`http://localhost:4000/todos/${title}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Don't be clumsy");
      }
      return response.text();
    })
    .then((data) => {
      const win = window.open();
      win.document.write(data);
      win.document.close();
    })
    .catch((error) => {
      clientErr("#read-error");
    });
}

// POST /todos/add
function createTodo(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const title = formData.get("title");
  const detail = formData.get("detail");

  const res = fetch("http://localhost:4000/todos/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, detail }),
  })
    .then((res) => {
      if (!res.ok) {
        console.log("There might be an issue on the server");
      }
      return res.json();
    })
    .then((todos) => {
      readTodos();
    });

  this.reset();
}

// PUT /todos/update
function updateTodo(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const prevTitle = formData.get("prevTitle");
  const title = formData.get("title");
  const detail = formData.get("detail");

  const res = fetch(`http://localhost:4000/todos/update/${prevTitle}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, detail }),
  }).then((res) => {
    if (!res.ok) {
      console.log("There might be an error inside the server");
      clientErr("#update-error");
    }

    readTodos();
  });
  this.reset();
}

// DELETE /todos/delete/:id
function removeTodo(e) {
  e.preventDefault();

  const formData = new FormData(this);
  const title = formData.get("title");

  const res = fetch(`http://localhost:4000/todos/delete/${title}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        console.log("There might be an error fetching data");
      }

      readTodos();
    })
    .catch((error) => {
      console.log(error);
    });
  this.reset();
}

getTodos.addEventListener("click", readTodos);
getTodo.addEventListener("submit", readTodo);
postTodo.addEventListener("submit", createTodo);
putTodo.addEventListener("submit", updateTodo);
deleteTodo.addEventListener("submit", removeTodo);


window.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    readTodos();
  }
});
