const express = require('express')
const router = express.Router()
const {Question, Answer} = require('../models/index')

router.post('/:id/answers', async (req, res) => {
    const questionId = Number(req.params.id)
    const question = await Question.findByPk(questionId)
    console.log(question)
    if(!question) {
        return res.status(404).json('Error, question doesnt exist')
    }

    const answer = await Answer.create({content: req.body.content , questionId: questionId})

    res.status(201).json(answer)
})

module.exports = router
