import Question from '../models/Question.js';

export const getQuestionsByGroupId = async (req, res) => {
  const { groupId } = req.query; // Get groupId from query parameters

  try {
    const questions = await Question.findAll({ where: { groupId } });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching questions', error });
  }
};

export const createQuestion = async (req,res) => {
  try {
    if (Array.isArray(req.body)) {
      // Handle multiple questions
      const questions = await Question.bulkCreate(req.body);
      res.status(201).json(questions);
    } else {
      // Handle single question
      const question = await Question.create(req.body);
      res.status(201).json(question);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}