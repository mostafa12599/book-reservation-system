const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const auth = require('../middleware/auth');


router.get('/', async (req, res) => {
    try {
        const books = await Book.find().sort({ date: -1 });
        res.json(books);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Book not found' });
        }
        res.status(500).send('Server Error');
    }
});


router.post('/', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        const { title, author, isbn, quantity } = req.body;

        const newBook = new Book({
            title,
            author,
            isbn,
            quantity,
            available: quantity
        });

        const book = await newBook.save();
        res.json(book);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;