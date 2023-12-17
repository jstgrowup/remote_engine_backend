import { Client } from "../models/client.model.js";

import { ApiError } from "../utils/error.js";
import jwt from "jsonwebtoken";
export const verifyJwtForClient = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(500).json(new ApiError(401, "Unauthorized User"));
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await Client.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      return res.status(500).json(new ApiError(401, "Invalid Token"));
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(500, "Something went wrong with the token");
  }
};
