const express = require("express");
const router = express.Router();

const bookController = require("../controller/bookcontroller");
const validateBook = require("../middleware/validateBook");
const auth = require("../middleware/auth");

router.post("/book", bookController.createBook);

router.get("/", bookController.getBooks);

router.get("/overdue/all", bookController.getOverdueBooks);

router.get("/:id", bookController.getBookById);

router.post("/:id/borrow", bookController.borrowBook);

router.post("/:id/return", bookController.returnBook);

router.delete("/:id", bookController.deleteBook);

module.exports = router;
