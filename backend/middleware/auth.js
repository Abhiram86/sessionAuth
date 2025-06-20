import { z, ZodError } from "zod";

// Schemas
// Register
const userRegisterSchema = z.object({
  username: z.string().min(4),
  email: z.string().email(),
  password: z.string().min(8),
});

// Login
const userLoginSchema = z
  .object({
    username: z.string().min(4).optional(),
    email: z.string().email().optional(),
    password: z.string().min(8),
  })
  .refine(
    (data) => {
      return (data.email || data.username) && !(data.email && data.username);
    },
    {
      message: "email or username is required",
      path: ["email"],
    }
  );

// Middleware
// Register
export const validateRegister = (req, res, next) => {
  try {
    userRegisterSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

// Login
export const validateLogin = (req, res, next) => {
  try {
    userLoginSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
