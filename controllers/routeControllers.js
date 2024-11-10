let todos = [];

// read todos
export const readTodos = (req, res, next) => {
  if (todos === 0) {
    const error = new Error("Oops! There are no Todos");
    error.status = 404;
    return next(error);
  }

  res.json(todos);
};

// read todo
// GET todos/:title
export const readTodo = (req, res, next) => {
  const title = req.params.title;
  const todo = todos.find((todo) => todo.title === title);

  if (!todo) {
    const error = new Error(`Todo with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }
  res.render("todo", { todo });
};

// create todo
// POST todos/add
export const createTodo = (req, res, next) => {
  const todo = {
    id: todos.length + 1,
    title: req.body.title,
    detail: req.body.detail,
  };

  if (!todo) {
    const error = new Error("Please insert the Title and Detail");
    error.status = 404;
    return next(error);
  }

  todos.push(todo);
  res.json(todos);
};

// update todo
// PUT todos/update/:id
export const updateTodo = (req, res, next) => {
  const prevTitle = req.params.prevTitle;
  const todo = todos.find((todo) => todo.title === prevTitle);

  if (!todo) {
    const error = new Error(`Todo with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  todo.title = req.body.title;
  todo.detail = req.body.detail;
  res.json(todos);
};

// delete todo
// DELETE todos/delete/:id
export const deleteTodo = (req, res, next) => {
  const title = req.params.title;
  const todo = todos.filter((todo) => todo.title !== title);

  if (!todo) {
    const error = new Error(`Todo with the id of ${id} was not found`);
    error.status = 404;
    return next(error);
  }

  todos = todo;
  res.json(todos);
};
