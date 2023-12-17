import { ApiError } from "../utils/error.js";
import { ApiRespnse } from "../utils/response.js";

import { DeveloperOnboarding } from "../models/developers.onboarding.model.js";
import { Developer } from "../models/developer.model.js";
import skillsGenerator from "../utils/skillsGenerator.js";
import { DeveloperProfessionalExperience } from "../models/professionalExperience.model.js";
import { DeveloperEducationalExperience } from "../models/educationalExperience.model.js";

const onboardingDevelopers = async (req, res) => {
  try {
    const user = req.user;
    let {
      firstName,
      lastName,
      phoneNumber,
      email,
      skills,
      professionalExperience,
      educationalExperience,
    } = req.body;

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
    skills = skills.map((item) => item.value);
    const newOnboardingData = await DeveloperOnboarding.create({
      developerId: user._id,
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
    professionalExperience = professionalExperience
      .filter((item) => item.techStack.length > 0 && item.skillsUsed.length > 0)
      .map((item) => ({ ...item, onboardingId: checkNewOnboardingData._id }));
    educationalExperience = educationalExperience
      .filter(
        (item) => item.degreeName.length > 0 && item.schoolName.length > 0
      )
      .map((item) => ({ ...item, onboardingId: checkNewOnboardingData._id }));

    const newProfessionalexperience = (
      await DeveloperProfessionalExperience.insertMany(professionalExperience)
    ).map((item) => item._id);

    let newEducationalExperience =
      await DeveloperEducationalExperience.insertMany(
        educationalExperience
      ).then((result) => result.map((item) => item._id));

    checkNewOnboardingData.professionalExperience = newProfessionalexperience;
    checkNewOnboardingData.educationalExperience = newEducationalExperience;
    await checkNewOnboardingData.save({ validateBeforeSave: false });
    const developer = await Developer.findOne({
      email: checkNewOnboardingData.email,
    });
    developer.onboarding = checkNewOnboardingData._id;
    await developer.save({ ValiditeBeforeSave: false });

    return res
      .status(200)
      .json(new ApiRespnse(200, newOnboardingData, "Onboarding Successfull"));
  } catch (error) {
    console.log("error:", error);
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
