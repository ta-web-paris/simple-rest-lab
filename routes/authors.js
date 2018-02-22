const express = require("express");
const generateId = require("uuid/v4");
const bodyParser = require("body-parser");

const router = express.Router();

// Define database here
const Authors = require("../data/authors");
const Books = require("../data/books");

/* GET Author listing. */
router.get("/authors", (req, res, next) => {
  Authors.find(({}, err, authorlist) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(Authors);
  });
});

//POST Create a new Author
router.post("/authors", (req, res, next) => {
  console.log(req.body);
  const newAuthor = {
    name: req.body.name,
    website: req.body.website,
    id: generateId()
  };

  Authors.push(newAuthor);

  res.json({
    message: "New Author created!",
    book: newAuthor
  });
});

//GET one Auhtor by Id
router.get("/authors/:id", (req, res, next) => {
  const oneAuthor = Authors.find(author => author.id === req.params.id);
  res.json(oneAuthor);
});

//PUT one Author by Id
router.put("/authors/:id", (req, res, next) => {
  const oneAuthor = Authors.find(author => author.id === req.params.id);
  if (oneAuthor) {
    const putAuthor = {
      id: oneAuthor.id,
      name: req.body.name || oneAuthor.name,
      website: req.body.website || oneAuthor.website
    };
    const indexAuthor = Authors.indexOf(oneAuthor);
    Authors.splice(indexAuthor, 1);
    Authors.push(putAuthor);
  } else {
    const putAuthor = {
      id: generateId(),
      name: req.body.name,
      website: req.body.website
    };
    console.log("Author Id undefined: new Author created");
    Authors.push(putAuthor);
  }

  res.json({
    message: "Author put!"
  });
});

//GET one Auhtor by Id & books
router.get("/authors/:id/books", (req, res, next) => {
  res.json(Books.filter(book => book.author === req.params.id));
});

module.exports = router;
