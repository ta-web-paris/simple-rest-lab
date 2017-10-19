const express = require("express");
const generateId = require("uuid/v4");
const router = express.Router();
const authors = require("../data/authors");

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


// Define your endpoints here

module.exports = router;
