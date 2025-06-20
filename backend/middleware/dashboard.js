export const validateDashBoard = (req, res, next) => {
  if (!req.session.user) {
    console.log("Unauthorized");
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};
