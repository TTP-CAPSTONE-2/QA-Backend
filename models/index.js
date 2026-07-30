const db = require("../db");
const Task = require("./task.model");
const Answer = require("./answer.model");
const Question = require("./question.model");
const User = require('./user.model')


Question.hasMany(Answer)
Answer.belongsTo(Question)

User.hasMany(Question)
User.hasMany(Answer) 
Question.belongsTo(User)
Answer.belongsTo(User)

module.exports = {
  db,
  Task,
  Answer,
  Question,
  User
};
