const express = require("express");
const bodyParser = require("body-parser");

const authors = require("./routes/authors");
const books = require("./routes/books");

const app = express();
// Configure app and use your routers here
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/authors", authors);
app.use("/api/books", books);
module.exports = app;
