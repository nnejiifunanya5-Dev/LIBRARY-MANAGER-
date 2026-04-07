const express = require("express");
const router = express.Router();
const attendantController = require("../controller/attendantController");

router.get("/", attendantController.getAttendants);
router.get("/:id", attendantController.getAttendantById);
router.post("/", attendantController.createAttendant);
router.put("/:id", attendantController.updateAttendant);
router.delete("/:id", attendantController.deleteAttendant);

module.exports = router;