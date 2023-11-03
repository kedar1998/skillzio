import User from "../models/User.js";
import BadRequestError from "../errors/bad-request.js";
import UnauthenticatedError from "../errors/unauthenticated.js";
import { StatusCodes } from "http-status-codes";
import Course from "../models/Course.js";

const signInController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const token = user.createJWT();

  user.password = undefined;

  res.status(StatusCodes.OK).json({
    id: user._id,
    name: user.name,
    email: user.email,
    token,
    enrolledCourse: user.enrolledCourse,
  });
};

const signUpController = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  const userAlreadyExist = await User.findOne({ email });

  if (userAlreadyExist) {
    throw new BadRequestError("Email already registered");
  }

  const user = await User.create(req.body);

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    id: user._id,
    name: user.name,
    email: user.email,
    token,
    enrolledCourse: user.enrolledCourse,
  });
};

const getEnrolledCourses = async (req, res) => {
  const user = await User.find({ _id: req.user.userId });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  res.json({ enrolledCourse: user[0].enrolledCourse });
};

const markCourseCompleted = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const courseId = req.params.id;

  // console.log(user.enrolledCourse.find((item) => item.courseId == courseId));

  const updateCourseStatus = user.enrolledCourse.find(
    (item) => item.courseId == courseId
  );
  updateCourseStatus.completed = true;

  // Save the updated user data
  await user.save();

  res.json({ user, courseId });
};

export {
  signUpController,
  signInController,
  getEnrolledCourses,
  markCourseCompleted,
};
