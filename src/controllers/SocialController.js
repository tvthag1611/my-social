"use strict";

const con = require("../../dbConnection");

exports.createSocial = (req, res) => {
  const social = req.body;
  social.reaction = 0;
  con.query("INSERT INTO socials SET ?", [social], (error, results, fields) => {
    if (error) {
      res.send({
        code: 400,
        failed: "error ocurred",
      });
      console.log(error);
    } else {
      res.send({
        code: 200,
        success: "create new post success",
      });
    }
  });
};

exports.getAllSocial = (req, res) => {
  con.query("SELECT * FROM socials", (error, results, fields) => {
    if (error) {
      res.send({
        code: 400,
        failed: "error ocurred",
      });
    } else {
      res.send({
        code: 200,
        data: results[0],
      });
    }
  });
};

exports.getAllSocialByUsername = (req, res) => {
  const username = req.params.username;
  con.query(
    "SELECT * FROM socials WHERE username = ?",
    [username],
    (error, results, fields) => {
      if (error) {
        res.send({
          code: 400,
          failed: "error ocurred",
        });
      } else {
        res.send({
          code: 200,
          data: results[0],
        });
      }
    }
  );
};

exports.getSocialById = (req, res) => {
  const socialId = req.params.socialId;
  con.query(
    "SELECT * FROM socials WHERE socialId = ?",
    [socialId],
    (error, results, fields) => {
      if (error) {
        res.send({
          code: 400,
          failed: "error ocurred",
        });
      } else {
        res.send({
          code: 200,
          data: results[0],
        });
      }
    }
  );
};

exports.updateSocial = (req, res) => {
  const socialId = req.params.socialId;
  const social = req.body;
  con.query(
    "UPDATE socials SET ? WHERE socialId = ?",
    [social, socialId],
    (error, results, fields) => {
      if (error) {
        res.send({
          code: 400,
          failed: "error ocurred",
        });
      } else {
        res.send({
          code: 200,
          success: "updated social success",
        });
      }
    }
  );
};

exports.deleteSocial = (req, res) => {
  const socialId = req.params.socialId;
  con.query(
    "DELETE FROM socials WHERE socialId = ?",
    [social, socialId],
    (error, results, fields) => {
      if (error) {
        res.send({
          code: 400,
          failed: "error ocurred",
        });
      } else {
        res.send({
          code: 200,
          success: "deleted social success",
        });
      }
    }
  );
};
