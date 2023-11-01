import express from "express";
import { signInController, signUpController } from "../controllers/auth.js";

const router = express.Router();

router.route("/sign-in").post(signInController);

router.route("/sign-up").post(signUpController);

export default router;
