const { functions } = require("../../setup");
const jwt = require("jsonwebtoken");

const jwtKey = functions.config().erviceaccount_privateid_jwt.key;

const auth = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Access Denied: No Token Provided!");

  try {
    const decoded = jwt.verify(token, jwtKey);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid Token");
  }
};
