const {DataTypes} = require("sequelize")
const db = require("../db")

const Question = db.define('question',{
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    body:{
        type: DataTypes.TEXT,
        allowNull: false,
    }
})

module.exports = Question;