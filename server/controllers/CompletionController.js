import Completion from '../models/Completion.js';

export const saveCompletion = async (req, res) => {
  const { userId, groupId, score, total } = req.body;

  try {
    const completion = await Completion.create({
      userId,
      groupId,
      score,
      total,
    });
    res.status(201).json({ message: 'Completion saved successfully', completion });
  } catch (error) {
    res.status(500).json({ message: 'Error saving completion', error });
  }
};

export const getCompletionsByUserId = async (req, res) => {
  const { userId } = req.params; // Assuming the userId is passed as a URL parameter
  
  try {
    const completions = await Completion.findAll({where: { userId }});

    res.json(completions);
  } catch (err) {
    console.error("Error fetching completions:", err);
    res.status(500).json({ error: err.message });
  }
};
