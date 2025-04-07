const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');
const Book = require('../models/Book');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
    try {
        const reservations = await Reservation.find({ user: req.user.id })
            .populate('book', ['title', 'author'])
            .sort({ date: -1 });
        res.json(reservations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/', auth, async (req, res) => {
    try {
        const { bookId, startDate, endDate } = req.body;
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (start > end) {
            return res.status(400).json({ msg: 'End date must be after start date' });
        }

        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }

        if (book.available <= 0) {
            return res.status(400).json({ msg: 'Book is not available for reservation' });
        }

        const newReservation = new Reservation({
            user: req.user.id,
            book: bookId,
            startDate: start,
            endDate: end
        });

        book.available -= 1;
        await book.save();

        const reservation = await newReservation.save();
        res.json(reservation);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);

        if (!reservation) {
            return res.status(404).json({ msg: 'Reservation not found' });
        }

        if (reservation.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        if (reservation.status === 'completed') {
            return res.status(400).json({ msg: 'Cannot modify a completed reservation' });
        }

        if (reservation.status === 'active') {            
            const book = await Book.findById(reservation.book);            
            book.available += 1;
            await book.save();
        }

        reservation.status = 'cancelled';
        await reservation.save();
        res.json(reservation);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;