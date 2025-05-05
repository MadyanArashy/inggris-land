import Answer from "../models/Answer.js";

// Create one or multiple answers
export const createAnswer = async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      // Bulk create answers
      const answers = await Answer.bulkCreate(req.body);
      return res.status(201).json(answers);
    } else {
      // Single answer
      const answer = await Answer.create(req.body);
      return res.status(201).json(answer);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating answer(s)", error });
  }
};

// Get all answers for a given questionId
export const getAnswersByQuestionId = async (req, res) => {
  const { questionId } = req.query;

  if (!questionId) {
    return res.status(400).json({ message: "Missing questionId in query." });
  }

  try {
    const answers = await Answer.findAll({ where: { questionId } });
    return res.status(200).json(answers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching answers", error });
  }
};
