const express = require("express");
const generateId = require("uuid/v4");
const authorsDB = require("../data/authors");
const booksDB = require("../data/books");

const router = express.Router();

// Define your endpoints here
router.get("/", (req, res, next) => {
  let attribute = req.query.sort;

  function compare(a, b) {
    if (a[attribute] < b[attribute]) return -1;
    if (a[attribute] > b[attribute]) return 1;
    return 0;
  }

  if (attribute) {
    res.json(authorsDB.slice(0).sort(compare));
  } else {
    res.json(authorsDB);
  }
});

router.post("/", (req, res, next) => {
  const id = req.body.id;
  const name = req.body.name;
  const website = req.body.website;

  const newAuthor = {
    id: id,
    name: name,
    website: website
  };

  authorsDB.push(newAuthor);
  res.json(newAuthor);
});

router.get("/:id", (req, res, next) => {
  const author = authorsDB.filter(el => {
    return el.id === req.params.id;
  });
  res.json(author);
});

router.put("/:id", (req, res, next) => {
  const id = req.params.id;

  // First find the Author by id
  let author = authorsDB.find(el => {
    return el.id === id;
  });

  author = {
    id: id,
    name: req.body.name,
    website: req.body.website
  };
  const index = authorsDB.findIndex(el => {
    return el.id === id;
  });

  authorsDB[index] = author;
  res.json(author);
});

router.get("/:idauthor/books", (req, res, next) => {
  const id = req.params.idauthor;

  let books = booksDB.filter(el => {
    return el.author === id;
  });
  res.json(books);
});

// Bonus time
// router.get("/?sort=name", (req, res, next) => {
//   let attribute = req.query.sort;
//
//   function compare(a, b) {
//     if (a.attribute < b.attribute) return -1;
//     if (a.attribute > b.attribute) return 1;
//     return 0;
//   }
//   authorsDB.sort(compare);
// });

module.exports = router;
