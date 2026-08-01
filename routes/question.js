const express = require("express");
const router = express.Router();
const { Question, Answer, User } = require("../models");
const requireAuth = require('../middleware/requireAuth')

//Gets all Question
router.get("/", async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upvote a question
router.patch("/:id/upvote", async (req, res) => {
  try {
    const question = await Question.findByPk(Number(req.params.id));

    if (!question) {
      return res.status(404).json({ error: "Question not found!" });
    }

    question.votes = (question.votes || 0) + 1;
    await question.save();

    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Downvote a question
router.patch("/:id/downvote", async (req, res) => {
  try {
    const question = await Question.findByPk(Number(req.params.id));

    if (!question) {
      return res.status(404).json({ error: "Question not found!" });
    }

    question.votes = (question.votes || 0) - 1;
    await question.save();

    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Get Question by ID #
router.get("/:id", async (req, res) => {
  try {
    // const question = await Question.findByPk(Number(req.params.id), {
    //   include: [Answer, {
    //     model: User,
    //     attributes: ['name', 'email']
    //   }]
    // });
    // this new way allows the questions to include the answers, and answers to include the user data for the
    // person who also answered it

    const question = await Question.findByPk(Number(req.params.id), {
      include: [
        {
          model: User,
          attributes: ['name', 'email']
        },
        {
          model: Answer,
          include: [
            {
              model: User,
              attributes: ['name', 'email']
            }
          ]
        },
      ]

    });
    if (!question) {
      return res.status(404).json({ error: "Question not found!" });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Delete a Question by ID#
router.delete("/:id", async (req, res, next) => {
  try {
    const question = await Question.findByPk(Number(req.params.id));

    if (!question) {
      return res.status(404).json({ error: "Question not found!" });
    }
    await question.destroy();
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
});

//Make a new Question
router.post("/", requireAuth, async (req, res) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({ error: "Title and body are required." });
    }

    const question = await Question.create({
      title,
      body,
      userId: req.session.userId
    });

    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
