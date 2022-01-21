const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const header = req.headers["authorization"];
  if (header) {
    const token = header.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
      if (error) {
        return res.status(403).json("Token is invalid");
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json("You are not authenticated");
  }
};

const authorizeUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      res.status(403).json("You are not allowed to do this");
    }
  });
};

module.exports = { verifyToken, authorizeUser };
