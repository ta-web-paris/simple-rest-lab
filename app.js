const express = require("express");
const app = express();
const bodyParser = require('body-parser');
// Configure app and use your routers here
const authorsRouter = require('./routes/authors');
const booksRouter = require('./routes/books');

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/api/authors', authorsRouter);
app.use('/api/books', booksRouter);

module.exports = app;
