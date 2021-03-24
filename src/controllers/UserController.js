"use strict";

const con = require("../../dbConnection");
const bcrypt = require("bcrypt");

exports.register = async function (req, res) {
  const password = req.body.password;
  const encryptedPassword = await bcrypt.hash(password, 10);
  const account = {
    username: req.body.username,
    password: encryptedPassword,
  };

  con.query(
    "INSERT INTO accounts SET ?",
    account,
    function (error, results, fields) {
      if (error) {
        res.send({
          code: 400,
          failed: "error ocurred",
        });
        console.log(error);
      } else {
        res.send({
          code: 200,
          success: "user registered sucessfully",
        });
      }
    }
  );
};

exports.login = async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  con.query(
    "SELECT * FROM accounts WHERE username = ?",
    [username],
    async function (error, results, fields) {
      if (error) {
        res.send({
          code: 400,
          failed: "error ocurred",
        });
      } else {
        if (results.length > 0) {
          const comparision = await bcrypt.compare(
            password,
            results[0].password
          );
          if (comparision) {
            res.send({
              code: 200,
              success: "login sucessfull",
            });
          } else {
            res.send({
              code: 204,
              success: "Username and password does not match",
            });
          }
        } else {
          res.send({
            code: 206,
            success: "Username does not exits",
          });
        }
      }
    }
  );
};

exports.getUser = (req, res) => {
  const username = req.params.username;
  con.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (error, results, fields) => {
      if (error) {
        res.send({
          code: 400,
          failed: "error ocurred",
        });
        console.log(error);
      } else {
        if (results.length > 0) {
          res.send({
            status: 200,
            data: results,
          });
        } else {
          res.send({
            code: 206,
            success: "Username does not exits",
          });
        }
      }
    }
  );
};

exports.updateUser = (req, res) => {
  const username = req.params.username;
  const user = req.body;
  con.query(
    "UPDATE users SET ? WHERE username = ?",
    [user, username],
    (error, results, fields) => {
      if (error) {
        res.send({
          code: 400,
          failed: "error ocurred",
        });
        console.log(error);
      } else {
        res.send({
          code: 200,
          success: "updated sucessfully",
        });
      }
    }
  );
};
