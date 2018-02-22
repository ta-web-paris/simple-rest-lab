const express = require("express");
const generateId = require("uuid/v4");
const books = require("../data/books");
const router = express.Router();

//GET books
router.get("/", (req, res) => res.json(books));

//GET book with author Id
router.get("/:bookId", (req, res) => {
  const id = req.params.bookId;
  const result = books.filter(book => book.id === id);
  res.json(result[0]);
});

//POST newBook

router.post("/", (req, res) => {
  const author = req.body.author;
  const title = req.body.title;
  const description = req.body.description;
  const book = {
    id: generateId(),
    author: generateId(),
    title,
    description
  };
  books.push(book);
  res.json(book);
});

router.delete("/:bookId", (req, res) => {
  const id = req.params.bookId;
  const result = books.find(book => book.id === id);
  const index = books.indexOf(result);
  books.splice(index, 1);
  res.json(books);
});

router.patch("/:bookId", (req, res) => {
  const id = req.params.bookId;
  const result = books.find(book => book.id === id);
  if (result === "") {
    const author = req.body.author;
    const title = req.body.title;
    const description = req.body.description;
    const newBook = {
      id,
      author: generateId(),
      title,
      description
    };

    books.push(newBook);
    res.json(newBook);
  } else {
    const author = req.body.author;
    const title = req.body.title;
    const description = req.body.description;
    const index = books.indexOf(result);
    const book = books[index];
    console.log(book);
    books[index].author = author !== undefined ? author : book.author;
    books[index].title = title !== undefined ? title : book.title;
    books[index].description =
      description !== undefined ? description : book.description;
    books[index].id = id;
    res.json(books[index]);
    console.log(books[index]);
  }
});

module.exports = router;
