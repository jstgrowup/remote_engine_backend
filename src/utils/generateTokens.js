import { Client } from "../models/client.model.js";
import { Developer } from "../models/developer.model.js";
import { ApiError } from "./error.js";

export const generateAccessAndRefreshTokensForDeveloper = async (userId) => {
  try {
    const developer = await Developer.findById(userId);
    const developerInstance = new Developer();

    const accessToken = developerInstance.generateAccessToken(
      { id: developer._id, email: developer.email },
      (err, token) => {
        return token;
      }
    );
    const refreshToken = developerInstance.generateRefreshToken(
      { id: developer._id, email: developer.email },
      (err, token) => {
        return token;
      }
    );
    developer.refreshToken = refreshToken;
    await developer.save({ ValiditeBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("error:", error);
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};
export const generateAccessAndRefreshTokensForClients = async (userId) => {
  try {
    const client = await Client.findById(userId);
    const clientInstance = new Client();

    const accessToken = clientInstance.generateAccessToken(
      { id: client._id, email: client.email },
      (err, token) => {
        return token;
      }
    );
    const refreshToken = clientInstance.generateRefreshToken(
      { id: client._id, email: client.email },
      (err, token) => {
        return token;
      }
    );
    client.refreshToken = refreshToken;
    await client.save({ ValiditeBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("error:", error);
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};
