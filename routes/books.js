const express = require("express");
const generateId = require("uuid/v4");
const books = require("../data/books");
const authors = require("../data/authors");
const body = require('body-parser')

const router = express.Router();

// Define your endpoints here


router.get('/', (req, res, next) => {
	res.json(books)
})

router.get('/:id', (req, res, next) => {
	res.json(books.filter(el => el.id === req.params.id))
})

router.post('/', (req, res, next) => {
	const { author, title, description } = req.body
	const book = {
		id: generateId,
		author,
		title,
		description
	}
	books.push(book)
	res.json(book)
})

router.delete('/:id', (req, res, next) => {
	books.splice(books.indexOf(books.filter(el => el.id === req.params.id)))
	res.status(200)
})

router.patch('/:id', (req, res, next) => {
	if (req.body.id) return res.status(403).json({
		message: 'You cannot modify the ID of an item',
	});

	const { title, author, description } = req.body

	const model = {
		title: title || null,
		author: author || null,
		description: description || null,
	}
	const book = books.filter(el => el.id === req.params.id)[0]
	for (key of Object.keys(model)) {
		if (key !== null) {
			book[key] = model[key]
			console.log(key)
		}
	}
	res.json({ book })

})

// router.get(`?author=${authorId}`, (req, res, next) => {
// 	res.json(authors.filter(el => el.id === req.params.id))
// })
module.exports = router;