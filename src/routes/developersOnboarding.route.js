import { Router } from "express";

import {
  onboardingDevelopers,
  onboardingSkills,
} from "../controllers/developersOnboarding.controller.js";
const developerOnboardingRouter = Router();
developerOnboardingRouter.route("/developers").post(onboardingDevelopers);
developerOnboardingRouter.route("/skills").get(onboardingSkills);
export default developerOnboardingRouter;
