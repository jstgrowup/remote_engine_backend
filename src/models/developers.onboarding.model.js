import mongoose, { Schema } from "mongoose";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
        ref: "developerProfessionalExperiences",
        required: true,
      },
    ],
    educationalExperience: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "developerEducationalExperiences",
        required: true,
      },
    ],
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const DeveloperOnboarding = mongoose.model(
  "developerOnboarding",
  developerOnboardingSchema
);
