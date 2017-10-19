const express = require("express");
const authors = require('./routes/authors')
const books = require('./routes/books')
const bodyParser = require('body-parser')


const app = express();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/authors', authors)
app.use('/api/books', books)


module.exports = app;
