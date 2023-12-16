import mongoose, { Schema } from "mongoose";

const developerEducationalExperienceSchema = new Schema(
  {
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
    timeFrom: {
      type: Date,
      required: true,
    },
    timeUpto: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const DeveloperEducationalExperience = mongoose.model(
  "developerEducationalExperience",
  developerEducationalExperienceSchema
);
