const express = require("express");
const generateId = require("uuid/v4");
const router = express.Router();
const authors = require("../data/authors.json");
const books = require("../data/books.json");
const _ = require("lodash");

// Define your endpoints here

router.get("/:authorId/books", (req, res, next) => {
  const id = req.params.authorId;
  var query = _.filter(books, { author: id });
  res.json(query);
});

router.get("/:authorId", (req, res, next) => {
  const id = req.params.authorId;
  var query = _.filter(authors, { id: id })[0];
  res.json(query);
});

router.get("/", (req, res, next) => {
  res.json(authors);
});

router.post("/", (req, res, next) => {
  const name = req.body.name;
  const website = req.body.website;
  const newAuthor = {
    id: generateId(),
    name,
    website
  };
  authors.push(newAuthor);
  res.json(newAuthor);
});

router.put("/:authorId", (req, res, next) => {
  const id = req.params.authorId;
  const index = _.map(authors, "id").indexOf(id);
  if (index !== -1) {
    authors[index].name = req.body.name;
    authors[index].website = req.body.website;
    res.json("Update successful");
  } else {
    const name = req.body.name;
    const website = req.body.website;
    const updatedAuthor = {
      id: id,
      name,
      website
    };
    authors.push(updatedAuthor);
    res.json(updatedAuthor);
  }
});

module.exports = router;
