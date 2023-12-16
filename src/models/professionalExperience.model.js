import mongoose, { Schema } from "mongoose";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const DeveloperProfessionalExperienceSchema = new Schema(
  {
    onboardingId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "developerOnboarding",
    },
    companyName: {
      type: String,
      required: true,
    },
    techStack: {
      type: [String],
      required: true,
      lowercase: true,
    },
    skillsUsed: {
      type: [String],
      required: true,
      lowercase: true,
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

export const DeveloperProfessionalExperience = mongoose.model(
  "developerProfessionalExperience",
  DeveloperProfessionalExperienceSchema
);
