import { Router } from "express";

import {
  onboardingDevelopers,
  onboardingSkills,
} from "../controllers/developersOnboarding.controller.js";
import { verifyJwtForDevelopers } from "../middlewares/developerAuth.middleware.js";
const developerOnboardingRouter = Router();
developerOnboardingRouter
  .route("/developers")
  .post(verifyJwtForDevelopers, onboardingDevelopers);
developerOnboardingRouter.route("/skills").get(onboardingSkills);
export default developerOnboardingRouter;
