
// models/Book.js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    isbn: { type: String, unique: true, required: true },
    authors: [{ type: mongoose.Schema.Types.ObjectId, ref: "author" }],
    status: {
        type: String,
        enum: ["IN", "OUT"],
        default: "IN"
    },
    borrowedBy: { type: mongoose.Schema.Types.ObjectId, ref: "student" },
    IssuedBy: { type: mongoose.Schema.Types.ObjectId, ref: "attendant" },
    returnDate: { type: Date },  // <-- you probably want a Date here, not ObjectId
}, { timestamps: true });

// CREATE the model
const Book = mongoose.model("Book", bookSchema);

// EXPORT the model
module.exports = Book;