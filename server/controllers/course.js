import BadRequestError from "../errors/bad-request.js";
// import UnauthenticatedError from "../errors/unauthenticated.js";
import { StatusCodes } from "http-status-codes";
import Course from "../models/Course.js";
import User from "../models/User.js";

// Get all courses
const getAllCourses = async (req, res) => {
  const courses = await Course.find(
    {},
    "_id name instructor enrollmentStatus thumbnail"
  );

  res.status(StatusCodes.OK).json({
    courses,
  });
};

// Get single course
const getCourse = async (req, res) => {
  const course = await Course.find({ _id: req.params.id });

  res.status(StatusCodes.OK).json({
    course,
  });
};

// Enroll in a course
const enrollCourse = async (req, res) => {
  const course = await Course.findOne({ _id: req.params.id });

  if (!course) {
    throw new BadRequestError("No course found");
  }

  const user = await User.find({ _id: req.user.userId });
  let name = user[0].name;
  let email = user[0].email;

  // Check if the user is already enrolled in the course
  const isEnrolled = course.students.some(
    (student) => student.studentId === req.user.userId
  );

  if (isEnrolled) {
    throw new BadRequestError("User is already enrolled in the course");
  }

  course.students.push({ studentId: req.user.userId, name, email });
  user[0].enrolledCourse.push({
    courseId: course._id,
    courseName: course.name,
  });

  // Save the updated course with the new student
  user.$bypassHooks = true;
  await course.save();
  await user[0].save();

  res.status(StatusCodes.OK).json({
    userId: req.user.userId,
    name,
    email,
    course,
  });
};

export { getAllCourses, getCourse, enrollCourse };
