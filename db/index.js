const { Sequelize } = require("sequelize");

const db = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false, // set to console.log if you want to SEE the SQL Sequelize runs
});

module.exports = db;
