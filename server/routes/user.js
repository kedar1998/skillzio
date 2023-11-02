import express from "express";
import {
  getEnrolledCourses,
  markCourseCompleted,
  signInController,
  signUpController,
} from "../controllers/user.js";
import authMiddleware from "../middleware/authentication.js";

const router = express.Router();

router.route("/sign-in").post(signInController);

router.route("/sign-up").post(signUpController);

router.route("/mycourses").get(authMiddleware, getEnrolledCourses);

router.route("/completed/:id").get(authMiddleware, markCourseCompleted);

export default router;
