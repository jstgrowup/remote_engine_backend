import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.route.js";
import developerOnboardingRouter from "./routes/developersOnboarding.route.js";
import clientOnboardingRouter from "./routes/clientOnboarding.route.js";
const app = express();
app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use("/users", userRouter);
app.use("/onboarding", developerOnboardingRouter);
app.use("/client", clientOnboardingRouter);

app.get("/", (req, res) => {
  res.send("<h1>Server running fine</h1>");
});
export default app;
