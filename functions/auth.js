const { app, logger, functions } = require("./setup");
const jwt = require("jsonwebtoken");

const jwtKey = functions.config().serviceaccount_privateid_jwt.key;
// const refreshToken = functions.config().serviceaccount_clientid_jwt.refresh;

const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).send("Access Denied: No Token Provided!");

  try {
    jwt.verify(token, jwtKey, (err, user) => {
      if (err) {
        return res.status(403).send({ status: "Invalid Token", message: err });
      }
      req.user = user;
      next();
    });
  } catch (ex) {
    res.status(400).send({ status: "Failed", message: ex });
  }
};

app.post("/api/auth/login", (req, res) => {
  try {
    const username = req.body.username;
    if (!username) {
      return res.status(400).send("Invalid Username");
    }
    const user = { name: username };

    const accessToken = jwt.sign(user, jwtKey);

    res.status(200).send({ accessToken: accessToken });
  } catch (error) {
    logger.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = { authenticate, app };
