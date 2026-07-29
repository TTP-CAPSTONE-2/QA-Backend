const db = require('../db');
const Task = require('./task.model')
const Answer = require('./answer.model')

// ---------- associations ----------
// When you add a second model, describe how the tables relate here. Example:
//   User.hasMany(Task)     // one user has many tasks
//   Task.belongsTo(User)   // each task belongs to one user (adds a userId column)

module.exports = {
  db,
  Task,
  Answer
};