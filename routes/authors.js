const express = require("express");
const generateId = require("uuid/v4");
const router = express.Router();

const authors = require("../data/authors.json");
const books = require("../data/books.json");

router.get("/", (req, res) => {
  res.json(authors);
});

router.post("/", (req, res) => {
  const newAuthors = {
    id: generateId(),
    name: req.body.name,
    website: req.body.website
  };

  authors.push(newAuthors);
  res.json(newAuthors);
});

router.get("/:id", (req, res) => {
  res.json(authors.find(author => author.id === req.params.id));
});

router.put("/:id", (req, res) => {
  const editedAuthors = {
    id: req.params.id,
    name: req.body.name,
    website: req.body.website
  };

  const reduceCode = authors.find(author => author.id === editedAuthors.id);

  if (reduceCode) {
    reduceCode.name = editedAuthors.name;
    reduceCode.website = editedAuthors.website;
  } else {
    authors.push(editedAuthors);
  }
  res.json(reduceCode);
});

router.get("/:id/books", (req, res) => {
  const findAllBooks = books.filter(books => books.author === req.params.id);
  res.json(findAllBooks);
});

// Define your endpoints here

module.exports = router;
