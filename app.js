const express = require("express");
const bodyParser = require("body-parser");
const authors = require("./routes/authors");
const books = require("./routes/books");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Configure app and use your routers here
app.use(bodyParser.json());

app.use("/api", authors);
app.use("/api", books);

module.exports = app;
