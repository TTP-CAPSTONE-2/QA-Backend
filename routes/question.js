const express = require("express");
const router = require("router");
const { Quesiton } = require("../models");

//Gets all Question
router.get("/", async (req, res) => {
  const question = await Quesiton.findAll();
  res.json(question);
});