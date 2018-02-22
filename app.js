const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const books = require("./routes/books.js");
const authors = require("./routes/authors.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/books", books);
app.use("/authors", authors);
// Configure app and use your routers here

module.exports = app;
