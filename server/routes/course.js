import express from "express";
import {
  enrollCourse,
  getAllCourses,
  getCourse,
} from "../controllers/course.js";

import authMiddleware from "../middleware/authentication.js";

const router = express.Router();

router.route("/courses").get(getAllCourses);

router.route("/course/:id").get(getCourse);

router.route("/enroll/:id").get(authMiddleware, enrollCourse);

export default router;
