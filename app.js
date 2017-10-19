const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Configure app and use your routers here
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const authorsRouter = require('./routes/authors');
app.use('/api/authors', authorsRouter);


module.exports = app;
