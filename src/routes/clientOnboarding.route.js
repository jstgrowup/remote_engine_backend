import { Router } from "express";

import { getDevelopersDataForOnBoarding } from "../controllers/clientOnboarding.controller.js";
import { verifyJwtForClient } from "../middlewares/clientAuth.middleware.js";
const clientOnboardingRouter = Router();

clientOnboardingRouter
  .route("/onboarding")
  .get(verifyJwtForClient, getDevelopersDataForOnBoarding);
export default clientOnboardingRouter;
