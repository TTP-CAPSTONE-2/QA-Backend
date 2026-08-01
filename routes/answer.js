const express = require('express')
const router = express.Router()
const {Question, Answer} = require('../models/index')
const requireAuth = require('../middleware/requireAuth')

router.post('/:id/answers', requireAuth, async (req, res) => {
    const questionId = Number(req.params.id)
    const question = await Question.findByPk(questionId)
    if(!question) {
        return res.status(404).json('Error, question doesnt exist')
    }

    const answer = await Answer.create({content: req.body.content , questionId: questionId, userId: req.session.userId})

    res.status(201).json(answer)
})

module.exports = router
