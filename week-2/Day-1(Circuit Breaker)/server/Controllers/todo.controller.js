const asyncHandler = require("express-async-handler");
const todoModel = require("../model/todoModel");

exports.getTodoById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);

  const result = await todoModel.findById({ _id: id });

  res.status(200).json({ message: "Todo Fetch Successfully By ID  ", result });
});
exports.getTodo = asyncHandler(async (req, res) => {
  const { page, limit } = req.query;
  console.log(page, limit);
  const skip = (page - 1) * limit;
  const result = await todoModel
    .find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  setTimeout(() => {}, 2000);
  res.status(200).json({ message: "Todo Fetch Successfully ", result });
});
exports.addTodo = asyncHandler(async (req, res) => {
  const { task, desc, priority } = req.body;
  const result = await todoModel.create({ task, desc, priority });
  res.status(200).json({ message: "Todo Added Successfully ", result });
});
exports.deleteTodo = asyncHandler(async (req, res) => {
  await todoModel.findByIdAndDelete(req.params.todoId);
  res.status(200).json({ message: "Todo Deleted Successfully " });
});
exports.udpateTodo = asyncHandler(async (req, res) => {
  console.log("params", req.params.todoId);
  console.log("body", req.body);
  const { task, desc, priority } = req.body;
  const updatedTodo = await todoModel.findByIdAndUpdate(
    req.params.todoId,
    { task, desc, priority },
    {
      new: true,
    }
  );
  res.status(200).json({ message: "Todo Updated Successfully ", updatedTodo });
});
