const express = require("express");
const router = express.Router();
const { Questions, Categories } = require("../controllers/testController");

router.get("/questions/:ques_table/:options_table", Questions);
router.get("/categories", Categories);

module.exports = router;
