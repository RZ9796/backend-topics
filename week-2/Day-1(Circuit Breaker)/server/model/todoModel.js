const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  task: { type: String },
  desc: { type: String },
  priority: { type: String },
});
module.exports = mongoose.model("todo", todoSchema);
