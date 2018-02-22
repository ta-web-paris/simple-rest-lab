const express = require("express");
const generateId = require("uuid/v4");

const router = express.Router();

// Define database here
const Books = require("../data/books");

/* GET book listing. */
router.get("/books", (req, res, next) => {
  Books.find(({}, err, booklist) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(booklist);
  });
});

//POST Create a new Book
router.post("/books", (req, res, next) => {
  console.log(req.body);
  const newBook = {
    author: req.body.author,
    title: req.body.title,
    description: req.body.description,
    id: generateId()
  };

  Books.push(newBook);

  res.json({
    message: "New Book created!",
    book: newBook
  });
});

//GET one books by Id
router.get("/books/:id", (req, res, next) => {
  const oneBook = Books.find(book => book.id === req.params.id);
  res.json(oneBook);
});

//DELETE one books by Id
router.delete("/books/:id", (req, res, next) => {
  const oneBook = Books.find(book => book.id === req.params.id);
  const indexBook = Books.indexOf(oneBook);
  Books.splice(indexBook, 1);
});

//PATCH Create a new Book
router.patch("/books/:id", (req, res, next) => {
  const oneBook = Books.find(book => book.id === req.params.id);
  const patchBook = {
    id: oneBook.id,
    author: req.body.author || oneBook.author,
    title: req.body.title || oneBook.title,
    description: req.body.description || oneBook.description
  };

  const indexBook = Books.indexOf(oneBook);
  Books.splice(indexBook, 1, patchBook);

  res.json({
    message: "Book updated!",
    book: patchBook
  });
});

module.exports = router;
