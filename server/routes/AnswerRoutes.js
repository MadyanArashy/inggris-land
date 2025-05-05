import express from "express";
import { createAnswer, getAnswersByQuestionId } from "../controllers/AnswerController.js";

const router = express.Router();

router.post("/answers", createAnswer);
router.get("/answers", getAnswersByQuestionId);

export default router;
