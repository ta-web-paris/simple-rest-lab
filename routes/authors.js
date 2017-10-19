const express = require("express");
const generateId = require("uuid/v4");
const authors = require("../data/authors");
const body = require('body-parser')
const books = require("../data/books");



const router = express.Router();

// Define your endpoints here

router.get('/', (req, res, next) => {
	const sorter = req.query.sort
	if (sorter) res.json(authors.map(el => el[sorter]).sort())
	res.json(authors)
})

router.get('/=', (req, res, next) => {
	res.json(authors.map(el => el.name))
})


router.get('/:id', (req, res, next) => {
	res.json(authors.filter(el => el.id === req.params.id))
})

router.post('/', (req, res, next) => {
	const { name, website } = req.body
	const author = {
		id: generateId,
		name,
		website,
	}
	return authors.push(author)
})

router.put('/:id', (req, res, next) => {
	const { name, website } = req.body
	const author = {
		id: req.params.id,
		name,
		website,
	}
	authors.push(author)
	res.send(author)
})

router.get('/:id/books', (req, res, next) => {
	res.json(books.filter(el => el[req.params.id]).map(el => el.title))
})



module.exports = router;