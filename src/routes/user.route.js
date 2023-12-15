import { Router } from "express";
import {
  signupClients,
  signupDevelopers,
  loginClients,
  loginDevelopers,
} from "../controllers/user.controller.js";
const userRouter = Router();
userRouter.route("/signup/developer").post(signupDevelopers);
userRouter.route("/login/developer").post(loginDevelopers);
userRouter.route("/signup/clients").post(signupClients);
userRouter.route("/login/clients").post(loginClients);

export default userRouter;
