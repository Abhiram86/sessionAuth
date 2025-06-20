import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.auth.js";
import { validateLogin, validateRegister } from "../middleware/auth.js";

const authRouter = express.Router();

authRouter.post("/register", validateRegister, registerUser);
authRouter.post("/login", validateLogin, loginUser);
authRouter.post("/logout", logoutUser);

export default authRouter;
