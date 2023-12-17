import mongoose, { Schema } from "mongoose";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const developerSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    onboarding: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "developerOnboardings",
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
developerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
developerSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
developerSchema.methods.generateAccessToken = function (data, callback) {
  const token = Jwt.sign(
    {
      _id: data.id,
      email: data.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
  return callback(null, token);
};
developerSchema.methods.generateRefreshToken = function (data, callback) {
  const token = Jwt.sign(
    {
      _id: data.id,
      email: data.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
  return callback(null, token);
};

export const Developer = mongoose.model("developer", developerSchema);
