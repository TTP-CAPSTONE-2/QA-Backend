const {DataTypes} = require('sequelize')
const db = require('../db/index')

const Answer = db.define('answer', {
    body: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports = Answer