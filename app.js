const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configure app and use your routers here
app.use("/authors", require("./routes/authors"));
app.use("/books", require("./routes/books"));

module.exports = app;
