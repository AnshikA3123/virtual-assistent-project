import express from "express";
import { signUp, Login, logout } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", Login);
router.post("/logout", logout);

export default router;
