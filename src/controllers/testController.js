const TestModel = require("../models/testModel");

const Questions = async (req, res) => {
  try {
    //console.log(req.params.ques_table);
    const questions = await TestModel.fetchQuestions(
      req.params.ques_table,
      req.params.options_table
    );
    res.status(200).json({
      success: true,
      questions,
    });
  } catch (error) {
    throw error;
  }
};

const Categories = async (req, res) => {
  try {
    const categories = await TestModel.fetchCategories();
    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    throw error;
  }
};

const Results = async (req, res) => {
  try {
    const result = await TestModel.saveResult(
      req.params.user_id,
      req.body
    );
    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error('Error saving results:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  Questions,
  Categories,
  Results,
};