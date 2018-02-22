const express = require("express");
const generateId = require("uuid/v4");
const router = express.Router();

const books = require("../data/books.json");

router.get("/", (req, res) => {
  res.json(books);
});

router.post("/", (req, res) => {
  const newBooks = {
    id: generateId(),
    author: req.body.author,
    title: req.body.title,
    description: req.body.description
  };

  books.push(newBooks);
  res.json(newBooks);
});

// Define your endpoints here

module.exports = router;
