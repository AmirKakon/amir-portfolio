const { dev, logger, functions } = require("../../setup");
const jwt = require("jsonwebtoken");

const jwtKey = functions.config().serviceaccount_privateid_jwt.key;
const jwtRefresh = functions.config().serviceaccount_clientid_jwt.refresh;

// FUTURE: via database
let refreshTokens = [];

const authenticate = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .send({
          status: "Failed",
          message: "Access Denied: No Token Provided!",
        });
    }

    jwt.verify(token, jwtKey, (err, user) => {
      if (err) {
        return res.status(403).send({ status: "Invalid Token", error: err });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    logger.error(error);
    res.status(400).send({ status: "Failed", error: error });
  }
};

const generateTokens = (user, refresh) => {
  const accessToken = jwt.sign(user, jwtKey, { expiresIn: "15m" });
  if (!refresh) return accessToken;

  const refreshToken = jwt.sign(user, jwtRefresh);

  // FUTURE: add to database
  refreshTokens.push(refreshToken);

  return { accessToken, refreshToken };
};

dev.post("/api/auth/login", (req, res) => {
  try {
    const username = req.body.username;
    if (!username) {
      return res
        .status(400)
        .send({ status: "Failed", message: "Invalid Username" });
    }
    const user = { name: username };

    const { accessToken, refreshToken } = generateTokens(user, true);

    res.status(200).send({
      status: "Success",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).send({ status: "Failed", message: error });
  }
});

dev.delete("/api/auth/logout", (req, res) => {
  try {
    // FUTURE: delete from database
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);

    res.status(200).send({ status: "Success", message: "Logged Out" });
  } catch (error) {
    logger.error(error);
    res.status(500).send({ status: "Failed", message: error });
  }
});

dev.post("/api/auth/token", (req, res) => {
  try {
    const refreshToken = req.body.token;
    if (!refreshToken) {
      return res.status(401).send({
        status: "Failed",
        message: "Access Denied: No Token Provided!",
      });
    }

    if (!refreshTokens.includes(refreshToken)) {
      return res
        .status(403)
        .send({ status: "Failed", message: "Invalid Token" });
    }

    jwt.verify(refreshToken, jwtRefresh, (err, user) => {
      if (err) {
        return res.status(403).send({ status: "Invalid Token", message: err });
      }
      const accessToken = generateTokens({ name: user.name }, false);
      res.status(200).send({ status: "Success", accessToken: accessToken });
    });
  } catch (error) {
    logger.error(error);
    res.status(400).send({ status: "Failed", message: error });
  }
});

module.exports = { authenticate, dev };
