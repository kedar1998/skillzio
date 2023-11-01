import User from "../models/User.js";
import BadRequestError from "../errors/bad-request.js";
import UnauthenticatedError from "../errors/unauthenticated.js";
import { StatusCodes } from "http-status-codes";
import Course from "../models/Course.js";

const getAllCourses = async (req, res) => {
  const courses = await Course.find(
    {},
    "name instructor enrollmentStatus thumbnail"
  );

  res.status(StatusCodes.OK).json({
    courses,
  });
};

const getCourse = async (req, res) => {
  const course = await Course.find({ _id: req.params.id });

  res.status(StatusCodes.OK).json({
    course,
  });
};

export { getAllCourses, getCourse };
