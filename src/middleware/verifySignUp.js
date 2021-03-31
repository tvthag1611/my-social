const con = require("../../dbConnection");

exports.checkDuplicateUsername = (req, res, next) => {
  const username = req.body.username;
  con.query(
    "SELECT * FROM accounts WHERE username = ?",
    [username],
    (error, results, fields) => {
      if (error) {
        res.send({
          status: 400,
          message: "error",
        });
      } else {
        if (!results) {
          res.send({
            status: 400,
            message: "Failed! Username is already in use",
          });
          return;
        }
        next();
      }
    }
  );
};
