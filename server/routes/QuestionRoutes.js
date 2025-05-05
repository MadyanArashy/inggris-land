import express from 'express';
import { getQuestionsByGroupId, createQuestion } from '../controllers/QuestionController.js';

const router = express.Router();

router.get('/questions', getQuestionsByGroupId); // Route to get questions for a specific group
router.post('/questions', createQuestion); // Route to get questions for a specific group

export default router;
