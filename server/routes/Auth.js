import express from "express";
import { register, login, getCurrentUser, logout } from "../controllers/auth/AuthController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", getCurrentUser);
router.post("/logout", logout);

export default router;
