import express from 'express';
import { saveCompletion } from '../controllers/CompletionController.js';

const router = express.Router();

router.post('/completions', saveCompletion); // Route to save completion data

export default router;
