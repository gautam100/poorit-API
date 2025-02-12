const express = require("express");
const router = express.Router();
const { Questions, Categories, Results } = require("../controllers/testController");

router.get("/questions/:ques_table/:options_table", Questions);
router.get("/categories", Categories);
router.post("/result/:user_id", Results);

module.exports = router;
