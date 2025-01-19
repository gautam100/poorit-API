const express = require("express");
const router = express.Router();
const { Questions, Categories } = require("../controllers/testController");

router.get("/questions", Questions);
router.get("/categories", Categories);

module.exports = router;
