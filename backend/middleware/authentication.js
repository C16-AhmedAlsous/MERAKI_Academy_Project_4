const jwt = require("jsonwebtoken");
const authentication = async (req, res, next) => {
  if (!req.headers.authorization) {
    res.status(403).json({
      success: false,
      message: "Forbidden",
    });
  } else {
    const token = req.headers.authorization.split(" ")[1];
    try {
      const verify = await jwt.verify(token, process.env.SECRET);
      req.token = verify;
      next();
    } catch (err) {
      res.status(401).json({
        success: false,
        message: "The token is invalid or expired",
      });
    }
  }
};

module.exports = authentication;
