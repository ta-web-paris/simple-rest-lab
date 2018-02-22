const express = require("express");
const generateId = require("uuid/v4");
const authors = require("../data/authors");
const books = require("../data/books");
const router = express.Router();

// GET All authors

// POST New author
router.post("/", (req, res) => {
  const name = req.body.name;
  const website = req.body.website;
  const author = {
    id: generateId(),
    name,
    website
  };
  authors.push(author), res.json(author);
});

//GET author Id
router.get("/:authorId", (req, res) => {
  const id = req.params.authorId;
  const result = authors.filter(author => author.id === id);
  res.json(result[0]);
});

//PUT authorId
router.put("/:authorId", (req, res) => {
  const id = req.params.authorId;
  const result = authors.filter(author => author.id === id);
  if (result.length === 0) {
    const name = req.body.name;
    const website = req.body.website;
    const newAuthor = {
      id: generateId(),
      name,
      website
    };
    authors.push(newAuthor);
    res.json(newAuthor);
  } else {
    const name = req.body.name;
    const website = req.body.website;
    const newAuthor = {
      id,
      name,
      website
    };
    authors[authors.indexOf(result[0])] = newAuthor;
    res.json(newAuthor);
  }
});
//GET books
router.get("/:authorId/books", (req, res) => {
  const id = req.params.authorId;
  const result = books.filter(book => book.author === id);
  console.log(result);
  res.json(result);
});

//GET sort authors
router.get("/", (req, res) => {
  authors.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  res.json(authors);
});

module.exports = router;
