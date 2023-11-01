import "express-async-errors";
// Import required modules
import express from "express";
import auth from "./routes/auth.js";
import course from "./routes/course.js";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./db/connect.js"; // Database Connection
import errorHandlerMiddleware from "./errors/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";

dotenv.config();
const app = express();

// Configure middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/v1", auth);

app.use("/api/v1", course);

// Middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Start Server
const start = async () => {
  try {
    await connect(process.env.MONGO_URL); // Connect to the database
    app.listen(process.env.PORT, () => {
      console.log(`Server is listening on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
