import express from "express"
import { loginOrSignup } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/login", loginOrSignup)

export default router;