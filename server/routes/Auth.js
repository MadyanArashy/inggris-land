import express from "express";
import { register, login, getCurrentUser, logout, updateUser } from "../controllers/auth/AuthController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/update", updateUser);
router.get("/me", getCurrentUser);
router.post("/logout", logout);

export default router;
