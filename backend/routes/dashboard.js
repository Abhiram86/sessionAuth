import express from "express";
import { validateDashBoard } from "../middleware/dashboard.js";

const dashBoardRouter = express.Router();

dashBoardRouter.get("/", validateDashBoard, (req, res) => {
  res.json({ message: "This is a protected Route" });
});

export default dashBoardRouter;
