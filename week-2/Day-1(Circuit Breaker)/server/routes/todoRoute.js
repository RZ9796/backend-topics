const router = require("express").Router();
const TodoController = require("../Controllers/todo.controller");
router
  .get("/:id", TodoController.getTodoById)
  .get("/", TodoController.getTodo)
  .post("/add", TodoController.addTodo)
  .delete("/delete/:todoId", TodoController.deleteTodo)
  .put("/update/:todoId", TodoController.udpateTodo);
module.exports = router;
