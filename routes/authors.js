const express = require("express");
const generateId = require("uuid/v4");
const router = express.Router();
const authors = require("../data/authors.json");
const books = require("../data/books.json");

// Define your endpoints here

router.get("/", (req, res, next) => {
  console.log(req.query);
  if (JSON.stringify(req.query) === JSON.stringify({})) {
    res.json(authors);
  } else if (JSON.stringify(req.query) === JSON.stringify({ sort: "name" })) {
    authors.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      else return 0;
    });

    res.json(authors);
  }
});

router.post("/", (req, res, next) => {
  const { name, website } = req.body;
  const author = {
    id: generateId(),
    name,
    website
  };
  authors.push(author);
  res.json(author);
});

router.get("/:id", (req, res, next) => {
  const authorOne = authors.filter(author => author.id === req.params.id);
  res.json(authorOne);
});

router.put("/:id", (req, res, next) => {
  const authorsId = authors.map(element => element.id);
  const index = authorsId.indexOf(req.params.id);
  if (index === -1) {
    const { name, website } = req.body;
    const author = {
      id: generateId(),
      name,
      website
    };
    authors.push(author);
    res.json(author);
  } else {
    const authorOne = authors.filter(author => author.id === req.params.id);
    const { name, website } = req.body;
    const authorUpdate = {
      id: req.params.id,
      name,
      website
    };
    authors.splice(index, 1, authorUpdate);
    res.json(authorOne);
  }
});

router.get("/:authorId/books", (req, res, next) => {
  // console.log(req.params.authorId);
  const booksList = books.filter(book => book.author === req.params.authorId);
  res.json(booksList);
});

module.exports = router;
