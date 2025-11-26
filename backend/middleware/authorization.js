const authorization = (string) => {
  return (req, res, next) => {
    const permission = req.token.role.permissions;

    if (!permission.includes(string)) {
      res.status(401).json({ message: "unauthorized" });
    } else {
      next();
    }
  };
};

module.exports = authorization;
