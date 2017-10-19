const express = require("express");
const generateId = require("uuid/v4");
const books = require ("../data/books");
const router = express.Router();

// Define your endpoints here
router.get('/', (req,res) => {
  res.json(books);
})
module.exports = router;
