import { Developer } from "../models/developer.model.js";
import { DeveloperEducationalExperience } from "../models/educationalExperience.model.js";
import { ApiError } from "../utils/error.js";
import { ApiRespnse } from "../utils/response.js";

const getDevelopersDataForOnBoarding = async (req, res) => {
  try {
    const result = await Developer.aggregate([
      {
        $lookup: {
          from: "developeronboardings",
          localField: "onboarding",
          foreignField: "_id",
          as: "onboarding",
        },
      },
      {
        $unwind: "$onboarding",
      },
      {
        $lookup: {
          from: "developerprofessionalexperiences",
          localField: "onboarding.professionalExperience",
          foreignField: "_id",
          as: "onboarding.professionalExperience",
        },
      },
      {
        $lookup: {
          from: "developereducationalexperiences",
          localField: "onboarding.educationalExperience",
          foreignField: "_id",
          as: "onboarding.educationalExperience",
        },
      },
    ]);

    // let result = await Developer.find({}).populate({
    //   path: "onboarding",
    // populate: {
    //    path: "educationalExperience",
    //    // model: "developereducationalexperiences",
    // },
    //   populate: {
    //     path: "professionalExperience",
    //model:"developerprofessionalexperiences",
    //   },
    // });
    // result = await Promise.all(
    //   result.map(async (items) => {
    //     let newPopulatedDeveloperExperience =
    //       await DeveloperEducationalExperience.find({
    //         _id: { $in: items.onboarding.educationalExperience },
    //       });
    //     items.onboarding.educationalExperience =
    //       newPopulatedDeveloperExperience;
    //     return items;
    //   })
    // );
    return res.status(200).json(new ApiRespnse(200, result));
  } catch (error) {
    console.log("error:", error);
    return res
      .status(500)
      .json(new ApiError(500, "Something wrong in getting the developers"));
  }
};

export { getDevelopersDataForOnBoarding };
