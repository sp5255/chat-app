const jwt = require("jsonwebtoken");
const { getUser } = require("../services/user.service");
const SECRET_KEY = "secret-key";

exports.verifyToken = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ error: { message: "Access denied" } });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const { _id, ...userData } = await getUser({ email: decoded.email });
    req.user = userData._doc;
    next();
  } catch (e) {
    res.status(401).json({ error: { message: "Invalid token" } });
    return;
  }
};