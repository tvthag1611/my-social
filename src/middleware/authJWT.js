const jwt = require("jsonwebtoken");
const con = require("../../dbConnection");

exports.verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.send({
      status: 403,
      message: "No token provided!",
    });
  }

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.send({
        status: 401,
        message: "Unauthorized!",
      });
    }
    req.username = decoded.username;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  const username = req.username;
  con.query(
    "SELECT * FROM users WHERE username = ? AND role = ?",
    [username, "admin"],
    (error, results, fields) => {
      if (error) {
        res.send({
          status: 400,
          message: "error",
        });
      } else {
        if (results.length === 0) {
          res.send({
            status: 403,
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
