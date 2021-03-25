const jwt = require("jsonwebtoken");
const con = require("../../dbConnection");

exports.verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  const userId = req.userId;
  con.query(
    "SELECT * FROM users WHERE userId = ? AND role = ?",
    [userId, "admin"],
    (error, results, fields) => {
      if (error) {
        res.status(400).send({
          faild: "error",
        });
      } else {
        if (results.length === 0) {
          res.status(403).send({
            message: "Require Admin Role!",
          });
          return;
        } else {
          next();
          return;
        }
      }
    }
  );
};
