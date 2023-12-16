import { Router } from "express";
import {
  signupClients,
  signupDevelopers,
  loginClients,
  loginDevelopers,
} from "../controllers/user.controller.js";
const developerOnboardingRouter = Router();
developerOnboardingRouter.route("/onboarding/developers").post(signupDevelopers);


export default developerOnboardingRouter;
