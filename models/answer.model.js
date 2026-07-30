const {DataTypes} = require('sequelize')
const db = require('../db/index')

const Answer = db.define('answer', {
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
})

module.exports = Answer