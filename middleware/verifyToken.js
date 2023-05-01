const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  let token = !!req.headers.authorization
    ? req.headers.authorization
    : null;
  if (!!token) {
    token = token.split('Bearer ')[1];
  }
  // const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized Access", status: 0 });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded.id;
    next();
  } catch (error) {
    return res.status(403).send("Invalid token");
  }
}

module.exports = verifyToken;
