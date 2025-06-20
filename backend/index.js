import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import connectDB from "./config/db.js";
import commonRouter from "./routes/common.js";
import dashBoardRouter from "./routes/dashboard.js";
import rateLimit from "express-rate-limit";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 5 * 60 * 1000,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    },
  })
);
app.use(
  rateLimit({
    windowMs: 20 * 1000,
    max: 10,
    message: "Too many requests from this IP, please try again later",
  })
);

connectDB();

app.use("/auth", authRouter);
app.use("/common", commonRouter);
app.use("/dashboard", dashBoardRouter);

app.get("/", (req, res) => {
  res.send("server running!");
});

app.get("/getUser", (req, res) => {
  console.log(req.session.user);
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 3000");
});
