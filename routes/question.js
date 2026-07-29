const express = require("express");
const router = require("router");
const { Quesiton } = require("../models");

//Gets all Question
router.get("/", async (req, res) => {
  const question = await Quesiton.findAll();
  res.json(question);
});

//Get Quesiton by ID #
router.get("/:id", async (req, res) => {
  const question = await Quesiton.findByPK(req.params.id);
  if (!question) {
    return res.status(404).json({ error: "Question not found!" });
  }
  res.json(question);
});
