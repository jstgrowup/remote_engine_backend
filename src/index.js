import dotenv from "dotenv";
import connectDB from "./db/index.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
const app = express();
dotenv.config({
  path: "./env",
});
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use("/users", userRouter);
app.get("/", (req, res) => {
  res.json("<h1>Server running fine</h1>");
});
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server connected ${port}`);
    });
  })
  .catch((err) => {
    console.log("mongoDB error", err);
  });
