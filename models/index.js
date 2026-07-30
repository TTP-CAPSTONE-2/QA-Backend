const db = require("../db");
const Task = require("./task.model");
const Answer = require("./answer.model");
const Question = require("./question.model");
const User = require('./user.model')

// ---------- associations ----------
// When you add a second model, describe how the tables relate here. Example:
//   User.hasMany(Task)     // one user has many tasks
//   Task.belongsTo(User)   // each task belongs to one user (adds a userId column)

Question.hasMany(Answer)
Answer.belongsTo(Question)

// User.hasMany(Question)
// User.hasMany(Answer) 
// Question.belongsTo(User)
// Answer.belongsTo(User)

module.exports = {
  db,
  Task,
  Answer,
  Question,
};
