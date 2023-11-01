import express from "express";
import { getAllCourses, getCourse } from "../controllers/course.js";

const router = express.Router();

router.route("/courses").get(getAllCourses);

router.route("/course/:id").get(getCourse);

export default router;
