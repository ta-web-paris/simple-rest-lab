const express = require("express");
const router = express.Router();
const generateId = require("uuid/v4");
const authors = require("../data/authors");
const books = require("../data/books");

// Define your endpoints here

// GET ALL AUTHORS & SORT BY NAME
router.get('/', (req, res, next) => {
    console.log(req.query)
    if(req.query.sort === 'name'){
        const sortedArray= authors.slice(0);
        
            sortedArray.sort((a,b) => {
                console.log('hello');
                return a.name < b.name ? -1 : 1 ;
            });
            res.json(sortedArray);
    } else {
        res.json({authors});
    }
});

// ADD AN AUTHOR
router.post('/', (req, res, next) => {
    const {name, website} = req.body;
    const id = generateId();
    const newAuthor = {name, website, id};
    authors.push(newAuthor);
    res.json(newAuthor);
});

// GET AUTHOR BY ID
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const foundAuthor = authors.find(obj => obj.id === id);
    res.json(foundAuthor);
});

// UPSERT THE AUTHOR DATA
router.put('/:id', (req, res, next) => {
    const {name, website} = req.body;
    const id = req.params.id;
    const newAuthor = {name, website, id};

    const lookForAuthor = authors.find(author => author.id === id);
        if(lookForAuthor) {
            lookForAuthor.name = name;
            lookForAuthor.website = website;
            res.json(lookForAuthor);
        } else {
            authors.push(newAuthor);
            console.log(authors);
            res.json(newAuthor);
        };
});

// GET ALL BOOKS BY ONE AUTHOR

router.get('/:id/books', (req, res, next)=> {
    const id = req.params.id;
    const booksArray = [];
    books.forEach((book)=>{
        if(book.author === id){
            booksArray.push(book);
        }
    });
    res.json({booksArray});
});

// DELETE AUTHOR

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    const deletedAuthor = authors.find((author,i) => {
        if(author.id === id){
            return authors.splice(i ,1);
        }
    });
    res.json(deletedAuthor);
    console.log('deleted ',authors);
});

// PATCH AUTHOR
router.patch('/:id', (req, res, next) => {
    const {name, website} = req.body;
    const id = req.params.id;
    const newAuthor = {name, website, id};

    const lookForAuthor = authors.find(author => author.id === id);
        if(lookForAuthor) {
            lookForAuthor.name = name;
            lookForAuthor.website = website;
            res.json(lookForAuthor);
        } else {
            res.json({message: `This ID doesn't exist`})
        };
});



module.exports = router;
