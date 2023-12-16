import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import developerOnboardingRouter from "./routes/developersOnboarding.route.js";
const app = express();
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
app.use("/onboarding", developerOnboardingRouter);
app.get("/", (req, res) => {
  res.send("<h1>Server running fine</h1>");
});
export default app;
