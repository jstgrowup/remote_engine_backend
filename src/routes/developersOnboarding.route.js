import { Router } from "express";

import {
  onboardingDevelopers,
  onboardingSkills,
} from "../controllers/developersOnboarding.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
const developerOnboardingRouter = Router();
developerOnboardingRouter
  .route("/developers")
  .post(verifyJwt, onboardingDevelopers);
developerOnboardingRouter.route("/skills").get(onboardingSkills);
export default developerOnboardingRouter;
