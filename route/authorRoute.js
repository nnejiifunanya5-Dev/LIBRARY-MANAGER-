
const express = require("express");
const router = express.Router();
const authorController = require("../controller/authorcontroller"); // check this path

router.get("/author", authorController.getAuthors);
router.get("/:id", authorController.getAuthorById);
router.post("/author", authorController.createAuthor);
router.put("/:id", authorController.updateAuthor);
router.delete("/:id", authorController.deleteAuthor);

module.exports = router;