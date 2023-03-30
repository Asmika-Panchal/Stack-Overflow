import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

import answerRoutes from "./routes/answers.js";
import questionRoutes from "./routes/questions.js";
import userRoutes from "./routes/users.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.get("/", (req, res) => {
  res.send("This is a stack overflow clone API");
});

app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer", answerRoutes);

const PORT = process.env.PORT || 6000;

const ADMIN = process.env.ADMIN;
const PASSWORD = process.env.PASSWORD;

mongoose.set("strictQuery", true);

mongoose
  .connect(
    `mongodb+srv://${ADMIN}:${PASSWORD}@stackoverflow.umbwgmv.mongodb.net/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    })
  )
  .catch((err) => console.log(err.message));
