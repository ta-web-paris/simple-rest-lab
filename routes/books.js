const express = require("express");
const generateId = require("uuid/v4");
const authors = require("../data/authors.json");
const books = require("../data/books.json");
const _ = require("lodash");

const router = express.Router();

// Define your endpoints here

router.get("/:bookId", (req, res, next) => {
  const id = req.params.bookId;
  var query = _.filter(books, { id: id })[0];
  res.json(query);
});

router.delete("/:bookId", (req, res, next) => {
  const id = req.params.bookId;
  //var query = _.filter(books, { id: id })[0];
  books.splice(_.map(books, "id").indexOf(id), 1);
  res.json("Deleted succesfully");
});

router.patch("/:bookId", (req, res, next) => {
  const id = req.params.bookId;
  const index = _.map(books, "id").indexOf(id);
  if (index !== -1) {
    if (req.body.author !== undefined) {
      books[index].author = req.body.author;
    }
    if (req.body.title !== undefined) {
      books[index].title = req.body.title;
    }
    if (req.body.description !== undefined) {
      books[index].description = req.body.description;
    }

    res.json(books[index]);
  } else {
    res.json("No book with that id found");
  }
});

router.get("/", (req, res, next) => {
  if (JSON.stringify(req.query) === JSON.stringify({})) {
    res.json(books);
  } else if (JSON.stringify(req.query) === JSON.stringify({ sort: "name" })) {
    console.log("here");
    res.json("Here I will sort");
  }
});

router.post("/", (req, res, next) => {
  const author = req.body.author;
  const title = req.body.title;
  const description = req.body.description;
  const newBook = {
    id: generateId(),
    author,
    title,
    description
  };
  books.push(newBook);
  res.json(newBook);
});

module.exports = router;
