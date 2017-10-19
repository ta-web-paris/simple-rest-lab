const express = require("express");
const generateId = require("uuid/v4");
const authorsDB = require("../data/authors");
const booksDB = require("../data/books");

const router = express.Router();

// Define your endpoints here
router.get("/", (req, res, next) => {
  res.json(booksDB);
});

router.post("/", (req, res, next) => {
  const newBook = {
    id: req.body.id,
    author: req.body.author,
    title: req.body.title,
    description: req.body.description
  };
  booksDB.push(newBook);
  res.json(newBook);
});

router.get("/:id", (req, res, next) => {
  const book = booksDB.filter(el => {
    return el.id === req.params.id;
  });
  res.json(book);
});

router.delete("/:id", (req, res, next) => {
  const index = booksDB.findIndex(el => {
    return el.id === req.params.id;
  });
  booksDB.slice(index, 1);
  res.json({ message: "Job is done :joy:" });
});

router.patch("/:id", (req, res, next) => {
  const id = req.params.id;

  // First find the Book by id
  let book = booksDB.find(el => {
    return el.id === id;
  });

  book = {
    id: id,
    author: req.body.author ? req.body.author : book.author,
    title: req.body.title ? req.body.title : book.title,
    description: req.body.description ? req.body.description : book.description
  };

  const index = booksDB.findIndex(el => {
    return el.id === req.params.id;
  });

  booksDB[index] = book;
  res.json(book);
});

module.exports = router;
