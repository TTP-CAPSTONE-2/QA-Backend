const express = require("express");
const router = require("router");
const { Question } = require("../models");

//Gets all Question
router.get("/", async (req, res) => {
  const question = await Question.findAll();
  res.json(question);
});

//Get Question by ID #
router.get("/:id", async (req, res) => {
  const question = await Question.findByPK(req.params.id);
  if (!question) {
    return res.status(404).json({ error: "Question not found!" });
  }
  res.json(question);
});

module.exports = router;
