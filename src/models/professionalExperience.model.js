import mongoose, { Schema } from "mongoose";

const DeveloperProfessionalExperienceSchema = new Schema({
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
  },
  skillsUsed: {
    type: [String],
    required: true,
  }
});

export const DeveloperProfessionalExperience = mongoose.model(
  "developerProfessionalExperience",
  DeveloperProfessionalExperienceSchema
);
