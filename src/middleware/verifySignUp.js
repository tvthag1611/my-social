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
          failed: "error",
        });
      } else {
        if (!results) {
          res.status(400).send({
            message: "Failed! Username is already in use",
          });
          return;
        }
        next();
      }
    }
  );
};
