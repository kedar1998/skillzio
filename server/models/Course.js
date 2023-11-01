import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  id: Number,
  name: String,
  instructor: String,
  description: String,
  enrollmentStatus: {
    type: String,
    enum: ["Open", "Closed", "In Progress"],
  },
  thumbnail: String,
  duration: String,
  schedule: String,
  location: String,
  prerequisites: [String],
  syllabus: [
    {
      week: Number,
      topic: String,
      content: String,
    },
  ],
  students: [
    {
      id: Number,
      name: String,
      email: String,
    },
  ],
});

export default mongoose.model("Course", courseSchema);
