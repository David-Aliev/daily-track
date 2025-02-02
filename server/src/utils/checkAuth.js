const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");

  if (token) {
    try {
      const decoded = jwt.verify(token, "secret123");
      req.userId = decoded._id;
      next();
    } catch (e) {
      return res.status(403).json({
        message: "Нету доступа",
      });
    }
  } else {
    return res.status(403).json({
      message: "Нету доступа",
    });
  }
}

module.exports = checkAuth