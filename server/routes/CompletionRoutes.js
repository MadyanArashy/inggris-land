import express from 'express';
import { saveCompletion, getCompletionsByUserId } from '../controllers/CompletionController.js';

const router = express.Router();

router.get('/completions/:userId', getCompletionsByUserId); // Route to save completion data
router.post('/completions', saveCompletion); // Route to save completion data

export default router;
