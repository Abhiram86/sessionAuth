import express from "express";
import limiter from "../middleware/common.js";

const commonRouter = express.Router();

commonRouter.get("/", limiter, (req, res) => {
  res.json({ message: "this is a common route" });
});

export default commonRouter;
