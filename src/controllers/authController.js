import User from "../models/Users.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";


export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      const error = new Error("User already exists");
      error.statusCode = 400;
      return next(error);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });

  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      return next(error);
    }

    res.status(200).json({
      success: true,
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });

  } catch (error) {
    next(error);
  }
};