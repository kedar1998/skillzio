import express from "express";
import {
  getEnrolledCourses,
  signInController,
  signUpController,
} from "../controllers/user.js";
import authMiddleware from "../middleware/authentication.js";

const router = express.Router();

router.route("/sign-in").post(signInController);

router.route("/sign-up").post(signUpController);

router.route("/mycourses").get(authMiddleware, getEnrolledCourses);

export default router;
