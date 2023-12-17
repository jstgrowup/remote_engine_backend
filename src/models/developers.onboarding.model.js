import mongoose, { Schema } from "mongoose";

const developerOnboardingSchema = new Schema(
  {
    developerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "developers",
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    skills: {
      type: [String],
      required: true,
    },
    professionalExperience: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "developerprofessionalexperiences",
        required: true,
      },
    ],
    educationalExperience: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "developereducationalexperiences",
        required: true,
      },
    ],
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
  { strictPopulate: false }
);

export const DeveloperOnboarding = mongoose.model(
  "developeronboardings",
  developerOnboardingSchema
);
