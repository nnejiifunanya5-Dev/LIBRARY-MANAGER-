
const Book = require("../models/book");

exports.createBook = async (req, res) => {
    try {
        const { title, author, isbn } = req.body;

        // if (!title || !author || !isbn) {
        //     return res.status(400).json({
        //         message: "title, author and isbn are required"
        //     });
        // }

        const existingBook = await Book.findOne({ isbn });

        if (existingBook) {
            return res.status(400).json({
                message: "book with this ISBN already exists"
            });
        }

        const book = new Book({
            title,
            author,
            isbn,
            status: "IN"
        });

        await book.save();

        res.status(201).json(book);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getBooks = async (req, res) => {
    try {
        const { page = 1, limit = 10, search } = req.query;

        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);

        const query = search
            ? {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                    { author: { $regex: search, $options: "i" } }
                ]
            }
            : {};

        const books = await Book.find(query)
            .skip((pageNum - 1) * limitNum)
            .limit(limitNum);

        const total = await Book.countDocuments(query);

        res.json({
            total,
            page: pageNum,
            pages: Math.ceil(total / limitNum),
            data: books
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ message: "book not found" });
        }

        res.json(book);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.borrowBook = async (req, res) => {
    try {
        const { studentId, attendantId, returnDate } = req.body;
        const bookId = req.params.id;

        if (!studentId || !attendantId || !returnDate) {
            return res.status(400).json({
                message: "all fields are required"
            });
        }

        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: "book not found" });
        }

        if (book.status === "OUT") {
            return res.status(400).json({ message: "book is already out" });
        }

        book.status = "OUT";
        book.borrowBy = studentId;
        book.issuedBy = attendantId;
        book.returnDate = returnDate;

        await book.save();

        return res.status(200).json({
            message: "book borrowed successfully",
            book
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.returnBook = async (req, res) => {
    try {
        const bookId = req.params.id;

        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: "book not found" });
        }

        if (book.status === "IN") {
            return res.status(400).json({ message: "book is already available" });
        }
        
        book.status = "IN";
        book.borrowedBy = null;
        book.IssuedBy = null;
        book.returnDate = null;

        await book.save();

        res.status(200).json({ message: "book returned successfully" });

    } catch (err) {
        console.error(err); // 👈 ADD THIS (very important for debugging)
        res.status(500).json({ message: err.message }); // 👈 show real error
    }
};

exports.getOverdueBooks = async (req, res) => {
    try {
        const today = new Date();

        const books = await Book.find({
            status: "OUT",
            returnDate: { $lt: today }
        });

        res.status(200).json(books);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).json({ message: "book not found" });
        }

        res.json({ message: "book deleted" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};