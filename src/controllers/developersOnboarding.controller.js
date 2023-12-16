import { ApiError } from "../utils/error.js";
import { ApiRespnse } from "../utils/response.js";

import { DeveloperOnboarding } from "../models/developers.onboarding.model.js";
import { Developer } from "../models/developer.model.js";
import skillsGenerator from "../utils/skillsGenerator.js";

const onboardingDevelopers = async (req, res) => {
  try {
    const { firstName, lastName, phoneNumber, email, skills } = req.body;
    if (!firstName || !lastName || !phoneNumber || !email || !skills) {
      return res
        .status(400)
        .json(new ApiError(400, "All the fields are mendatory"));
    }
    const checkOnboardingData = await DeveloperOnboarding.findOne({
      email,
      phoneNumber,
    });
    if (checkOnboardingData) {
      return res
        .status(400)
        .json(
          new ApiError(400, "Your onboarding is already done please recheck")
        );
    }
    const newOnboardingData = await DeveloperOnboarding.create({
      firstName,
      lastName,
      phoneNumber,
      email,
      skills,
    });
    const checkNewOnboardingData = await DeveloperOnboarding.findById(
      newOnboardingData._id
    );
    if (!checkNewOnboardingData) {
      return res
        .status(400)
        .json(
          new ApiError(400, "Something has gone while onboarding please retry")
        );
    }
    const developer = await Developer.findOne({
      email: checkNewOnboardingData.email,
    });
    developer.onboarding = checkNewOnboardingData._id;
    await developer.save({ ValiditeBeforeSave: false });
    return res
      .status(200)
      .json(new ApiRespnse(200, newOnboardingData, "Onboarding Successfull"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Server error"));
  }
};
const onboardingSkills = async (req, res) => {
  try {
    return res.json(skillsGenerator());
  } catch (error) {
    console.log("error:", error);
  }
};
export { onboardingDevelopers, onboardingSkills };
