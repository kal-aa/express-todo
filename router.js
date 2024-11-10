import express from "express";
import {
  createTodo,
  readTodos,
  readTodo,
  updateTodo,
  deleteTodo,
} from "./controllers/routeControllers.js";

const router = express.Router();

router.get("/", readTodos);

router.get("/:title", readTodo);

router.post("/add", createTodo);

router.put("/update/:prevTitle", updateTodo);

router.delete("/delete/:title", deleteTodo);

export default router;
