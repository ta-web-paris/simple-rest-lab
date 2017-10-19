const express = require("express");
const generateId = require("uuid/v4");
const books = require('../data/books.json')

const router = express.Router();

// Define your endpoints here
router.get('/', (req, res, next) => {
  res.json({books})
})

router.post('/', (req, res, next) => {
  const newBook = {
    id: generateId(),
    author: req.body.author,
    title: req.body.title,
    description: req.body.description
  };
  books.push(newBook)
  res.json({
    newBook,
    books
  })
})

router.get('/:id', (req, res, next) => {
  const id = req.params.id
  let foundBook = books.find( (book) => {
    return book.id === id
  })
  if (foundBook) res.json({foundBook})
  else res.json({error:'Didnt find book'})
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  books.forEach((book, i) => {
    if (id === book.id) {
      books.splice(i, 1)
      res.json({books})
    }
  })
  res.json({books})
})

router.patch('/:id', (req, res, next) => {
  let id = req.params.id
  let book = books.find( (book) => {
    return book.id === id
  })

  book.author = req.body.author || book.author
  book.title = req.body.title || book.title
  book.description = req.body.description || book.description

  res.json({book})
})

module.exports = router;
