const express = require("express");
const generateId = require("uuid/v4");
const router = express.Router();
const authors = require("../data/authors");
const books = require ("../data/books");



router.get('/', (req, res) => {
  res.json(authors);
});
router.post('/', (req, res) => {
  const id = generateId();
  const {
    name,
    website
  } = req.body;
  authors.push({
    id,
    name,
    website
  })
  res.json(authors);
});

router.get('/:id', (req, res) => {
  const id = req.params.id
  const authorSearched = authors.filter(obj => {
    return obj.id == id
  });
  res.json(authorSearched);
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const {name,website} = req.body;
  console.log(req.body);
  const authorSearched = authors.filter(obj => {
    return obj.id == id
  });console.log(authorSearched);
if (authorSearched.length>0) {
  authorSearched[0].name= name
  authorSearched[0].website= website
  console.log(website);
}
else {
  authors.push({
    id,
    name,
    website
  })
}
  res.json(authorSearched);
})

router.get('/:id/books', (req,res) => {
  const id = req.params.id
  const bookSearched= books.filter(obj => {
    return obj.author==id
  });
  res.json(bookSearched);
})
router.get('/books', (req,res) => {
  const id = req.params.id
  const bookSearched= books.filter(obj => {
    return obj.author==id
  });
  res.json(bookSearched);
})

// Define your endpoints here

module.exports = router;
