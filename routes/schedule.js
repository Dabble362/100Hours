const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers/schedule");
const { ensureAuth } = require("../middleware/auth");

router.post("/", ensureAuth, scheduleController.createShift);

router.get("/", ensureAuth, scheduleController.getSchedule);

module.exports = router;
