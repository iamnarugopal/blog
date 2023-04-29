const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  //   const authHeader = req.headers.authorization;
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized Access", status: 0 });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded.id;
    console.log('verify done');
    next();
  } catch (error) {
    return res.status(403).send("Invalid token");
  }
}

module.exports = verifyToken;
