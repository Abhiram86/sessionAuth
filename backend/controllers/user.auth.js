import User from "../models/user.js";
import bcrypt from "bcrypt";

// Register Logic
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ error: "Error saving session" });
      }
    });
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login Logic
export const loginUser = async (req, res) => {
  const body = req.body;
  try {
    const user = await User.findOne({
      $or: [{ email: body.email }, { username: body.username }],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (isPasswordValid) {
      req.session.user = {
        id: user._id,
        username: user.username,
        email: user.email,
      };
      req.session.save((err) => {
        if (err) {
          return res.status(500).json({ error: "Error saving session" });
        }
        res.status(200).json({
          message: "User logged in successfully",
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
          },
        });
      });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Logout Logic
export const logoutUser = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ error: "Error destroying session" });
    }
  });

  res.clearCookie("connect.sid", {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
  });

  res.status(200).json({ message: "User logged out successfully" });
};
