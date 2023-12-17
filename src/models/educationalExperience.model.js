import mongoose, { Schema } from "mongoose";

const developerEducationalExperienceSchema = new Schema({
  onboardingId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "developerOnboarding",
  },
  degreeName: {
    type: String,
    required: true,
  },
  schoolName: {
    type: String,
    required: true,
  },
});

export const DeveloperEducationalExperience = mongoose.model(
  "developerEducationalExperience",
  developerEducationalExperienceSchema
);
