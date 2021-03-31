"use strict";

const con = require("../../dbConnection");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
          status: 400,
          message: "error ocurred",
        });
        console.log(error);
      } else {
        res.send({
          status: 200,
          message: "User registered sucessfully",
        });
      }
    }
  );
};

exports.login = async function (req, res) {
  console.log("body", req.body);
  const username = req.body.username;
  const password = req.body.password;
  con.query(
    "SELECT * FROM accounts WHERE username = ?",
    [username],
    async function (error, results, fields) {
      if (error) {
        res.send({
          status: 400,
          message: "error ocurred",
        });
      } else {
        if (results.length > 0) {
          const comparision = await bcrypt.compare(
            password,
            results[0].password
          );
          if (comparision) {
            con.query(
              "SELECT * FROM users WHERE username = ?",
              [username],
              (error, results, fields) => {
                if (error) {
                  res.status(400).send({
                    failed: "error ocurred",
                  });
                } else {
                  const token = jwt.sign(
                    { username: results[0].username },
                    process.env.JWT_KEY,
                    {
                      expiresIn: 86400, // 24 hours
                    }
                  );
                  res.send({
                    status: 200,
                    data: results[0],
                    accessToken: token,
                  });
                }
              }
            );
          } else {
            res.send({
              status: 204,
              message: "Username and password does not match",
            });
          }
        } else {
          res.send({
            status: 206,
            message: "Username does not exits",
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
          status: 400,
          message: "error ocurred",
        });
        console.log(error);
      } else {
        if (results.length > 0) {
          res.send({
            status: 200,
            data: results[0],
          });
        } else {
          res.send({
            status: 206,
            message: "Username does not exits",
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
          status: 400,
          message: "error ocurred",
        });
        console.log(error);
      } else {
        res.send({
          status: 200,
          message: "updated sucessfully",
        });
      }
    }
  );
};

exports.createUser = (req, res) => {
  const user = req.body;
  user.role = "user";
  if (!user.imageUser)
    user.imageUser = "http://localhost:8080/PIC_20210126_154011579.jpg";
  con.query("INSERT INTO users SET ?", [user], (error, results, fields) => {
    if (error) {
      res.send({
        status: 400,
        message: "error ocurred",
      });
      console.log(error);
    } else {
      res.send({
        status: 200,
        message: "Create sucessfully",
      });
    }
  });
};
