const express = require("express");
const generateId = require("uuid/v4");
const books = require("../data/books.json");
const authors = require("../data/authors.json");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.json(books);
});

router.post("/", (req, res, next) => {
  const { author, title, description } = req.body;
  const book = {
    id: generateId(),
    title,
    author,
    description
  };
  books.push(book);
  res.json(book);
});

router.get("/:id", (req, res, next) => {
  const bookOne = books.filter(book => book.id === req.params.id);
  res.json(bookOne);
});

router.delete("/:id", (req, res, next) => {
  const booksId = books.map(element => element.id);
  const index = booksId.indexOf(req.params.id);
  // console.log(index);
  books.splice(index, 1);
  res.json(books);
});

router.patch("/:id", (req, res, next) => {
  const booksId = books.map(element => element.id);
  const index = booksId.indexOf(req.params.id);
  if (index === -1) {
    const { author, title, description } = req.body;
    const book = {
      id: generateId(),
      title,
      author,
      description
    };
    books.push(book);
    res.json(book);
  } else {
    const bookOne = books.filter(book => book.id === req.params.id);
    const { author, title, description } = req.body;

    const bookUpdate = {
      id: req.params.id,
      title,
      author,
      description
    };
    // bookUpdate$ = Object.assign({}, books[index]);
    books[index] = Object.assign({}, bookUpdate);
    res.json(books[index]);
  }
});
// Define your endpoints here

module.exports = router;
