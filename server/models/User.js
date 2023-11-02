import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is required"],
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    trim: true,
    unique: true,
    validate: {
      message: "please provide valide email",
      validator: validator.isEmail,
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    minlength: 6,
  },
  enrolledCourse: {
    type: [
      {
        courseId: String,
        courseName: String,
        completed: {
          type: Boolean,
          enum: [true, false],
          default: false,
        },
      },
    ],
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  let salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.createJWT = function () {
  const token = jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

export default mongoose.model("User", userSchema);
