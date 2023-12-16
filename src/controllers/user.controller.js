import { Client } from "../models/client.model.js";
import { Developer } from "../models/developer.model.js";
import { ApiError } from "../utils/error.js";
import { ApiRespnse } from "../utils/response.js";
import {
  generateAccessAndRefreshTokensForClients,
  generateAccessAndRefreshTokensForDeveloper,
} from "../utils/generateTokens.js";

const signupDevelopers = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json(new ApiError(400, "Email and password is required"));
    }
    const foundDeveloper = await Developer.findOne({ email });
    if (foundDeveloper) {
      return res
        .status(400)
        .json(new ApiError(400, "Account already exists with this Email"));
    }
    const developer = await Developer.create({
      email,
      password,
    });
    const newCreatedDeveloper = await Developer.findById(developer._id).select(
      "-password -refreshToken"
    );
    if (!newCreatedDeveloper) {
      return res
        .status(400)
        .json(new ApiError(400, "Something went wrong in user creation"));
    }
    return res
      .status(201)
      .json(
        new ApiRespnse(
          200,
          newCreatedDeveloper,
          "Developer created successfully"
        )
      );
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json(new ApiError(500, "Server error"));
  }
};
const loginDevelopers = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(password || email)) {
      return res
        .status(400)
        .json(new ApiError(400, "Username or Email is required"));
    }
    const developer = await Developer.findOne({
      email,
    });

    if (!developer) {
      return res
        .status(400)
        .json(new ApiError(400, "Developer does not exists"));
    }
    const isPassValid = await developer.isPasswordCorrect(password);

    if (!isPassValid) {
      return res.status(400).json(new ApiError(400, "Invalid Password"));
    }

    const { refreshToken, accessToken } =
      await generateAccessAndRefreshTokensForDeveloper(developer._id);
    const loggedInDeveloper = await Developer.findById(developer._id).select(
      "-password -refreshToken"
    );
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiRespnse(
          200,
          { user: loggedInDeveloper, accessToken, refreshToken },
          "User Logged In Successfully"
        )
      );
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json(new ApiError(500, "Server error"));
  }
};
const signupClients = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email || password)) {
      return res
        .status(400)
        .json(new ApiError(400, "Email or password is required"));
    }
    const foundClient = await Client.findOne({ email });
    if (foundClient) {
      return res
        .status(400)
        .json(new ApiError(400, "Account already exists with this Email"));
    }
    const client = await Client.create({
      email,
      password,
    });
    const newCreatedClient = await Client.findById(client._id).select(
      "-password -refreshToken"
    );
    if (!newCreatedClient) {
      return res
        .status(400)
        .json(new ApiError(400, "Something went wrong in client creation"));
    }
    return res
      .status(201)
      .json(
        new ApiRespnse(200, newCreatedClient, "Client created successfully")
      );
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json(new ApiError(500, "Server error"));
  }
};
const loginClients = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(password || email)) {
      return res
        .status(400)
        .json(new ApiError(400, "Username or Email is required"));
    }
    const client = await Client.findOne({
      email,
    });
    console.log("client:", client);

    if (!client) {
      return res.status(400).json(new ApiError(400, "Client does not exists"));
    }
    const isPassValid = await client.isPasswordCorrect(password);
    if (!isPassValid) {
      return res.status(400).json(new ApiError(400, "Invalid Password"));
    }

    const { refreshToken, accessToken } =
      await generateAccessAndRefreshTokensForClients(client._id);
    const loggedInClient = await Client.findById(client._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .header({
        accessToken: accessToken,
        refreshToken: refreshToken,
      })
      .json(
        new ApiRespnse(
          200,
          { user: loggedInClient, accessToken, refreshToken },
          "User Logged In Successfully"
        )
      );
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json(new ApiError(500, "Server error"));
  }
};
export { signupDevelopers, signupClients, loginClients, loginDevelopers };
