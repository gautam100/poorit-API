const TestModel = require("../models/testModel");

const Questions = async (req, res) => {
  try {
    const questions = await TestModel.fetchQuestions();
    res.status(200).json({
      success: true,
      questions,
    });
  } catch (error) {
    throw error;
  }
}

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
}

module.exports = {  
    Questions,
    Categories
};