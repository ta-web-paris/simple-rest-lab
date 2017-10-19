const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Configure app and use your routers here
const booksRouter = require("./routes/books");
const authorsRouter = require("./routes/authors");

app.use(bodyParser.json());
app.use("/api/books", booksRouter);
app.use("/api/authors", authorsRouter);

module.exports = app;
