import mongoose, { Schema } from "mongoose";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const clientSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
      index: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
clientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  //   if this fild is modified else go below
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
clientSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};
clientSchema.methods.generateAccessToken = function (data, callback) {
  const token = Jwt.sign(
    {
      _id: data._id,
      email: data.email,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
  return callback(null, token);
};
clientSchema.methods.generateRefreshToken = function (data, callback) {
  const token = Jwt.sign(
    {
      _id: data._id,
      email: data.email,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
  return callback(null, token);
};
export const Client = mongoose.model("Client", clientSchema);
