import User from "../models/User.js";
import BadRequestError from "../errors/bad-request.js";
import UnauthenticatedError from "../errors/unauthenticated.js";
import { StatusCodes } from "http-status-codes";

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
    password: user.password,
    token,
    enrolledCourse: user.enrolledCourse,
  });
};

export { signUpController, signInController };
