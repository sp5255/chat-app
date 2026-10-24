const protectedRoute = require("express").Router();

protectedRoute.get("/", async (req, res) => {
  try {
    const token = req.header("authorization");
    const decode = jwt.verify(token?.split(" ")[1], SECRET_KEY);
    if (!decode) throw new Error("INVALID TOKEN");
    res.status(200).json({ status: "Authorized" });
  } catch (error) {
    const errors = {};
    Object.keys(error).forEach((key) => {
      errors[key] = error[key];
    });
    res.status(401).json({ errors });
  }
});

module.exports = protectedRoute;
