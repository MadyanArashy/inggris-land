import Completion from '../models/Completion.js';

export const saveCompletion = async (req, res) => {
  const { userId, groupId, score } = req.body;

  try {
    const completion = await Completion.create({
      userId,
      groupId,
      score,
    });
    res.status(201).json({ message: 'Completion saved successfully', completion });
  } catch (error) {
    res.status(500).json({ message: 'Error saving completion', error });
  }
};
