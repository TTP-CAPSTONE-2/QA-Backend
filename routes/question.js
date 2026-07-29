const express = require("express");
const router = express.Router();
const { Question } = require("../models");

//Gets all Question
router.get("/", async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Get Question by ID #
router.get("/:id", async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) {
      return res.status(404).json({ error: "Question not found!" });
    }
    res.json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({ error: "Title and body are required." });
    }

    const question = await Question.create({
      title,
      body,
    });

    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
