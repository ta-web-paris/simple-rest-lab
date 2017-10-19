const express = require("express");
const generateId = require("uuid/v4");
const authors = require('../data/authors.json')
const books = require('../data/books.json')

const router = express.Router();

// Define your endpoints here

router.get('/', (req, res, next) => {
  res.json({
    authors
  })
})

router.post('/', (req, res, next) => {
  const newAuthor = {
    id: generateId(),
    name: req.body.name,
    website: req.body.website
  };
  authors.push(newAuthor)
  res.json({
    newAuthor,
    authors
  })
})

router.get('/:id', (req, res, next) => {
  const id = req.params.id
  authors.forEach(author => {
    if (id === author.id) {
      res.json({
        author
      })
    }
  })
  res.json({
    error: "Error looking up author"
  })
})

router.put('/:id', (req, res, next) => {
  const updateAuthor = {
    id: req.params.id,
    name: req.body.name,
    website: req.body.website
  };
  const id = req.params.id
  authors.forEach((author, i) => {
    if (id === author.id) {
      authors.splice(i, 1, updateAuthor)
      res.json(updateAuthor)
    }
  })
  authors.push(updateAuthor)
  res.json({updateAuthor})
})

router.get('/:id/books', (req, res, next) => {
  let authorID = req.params.id
  let authorBooks = []
  books.forEach( (book) => {
    if (book.author === authorID) authorBooks.push(book)
  })
  if (authorBooks.length === 0) {
    res.json({error: 'Incorrect author ID'})
  }
  res.json({authorBooks})
})

router.get('/?sort=name', (req, res, next) => {
  let sortedAuthors = authors.sort(function (a,b) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  })
    res.json(sortedAuthors)
  })


module.exports = router;