"use strict";
const { UserController } = require("../controllers");
const express = require("express");
const { verifySignUp, authJwt } = require("../middleware");
const UserRouter = express.Router();

UserRouter.post("/auth/login", UserController.login);
UserRouter.post(
  "/auth/register",
  [verifySignUp.checkDuplicateUsername],
  UserController.register
);
UserRouter.get(
  "/users/:username",
  [authJwt.verifyToken],
  UserController.getUser
);
UserRouter.put(
  "/users/:username",
  [authJwt.verifyToken, authJwt.isAdmin],
  UserController.updateUser
);
UserRouter.post(
  "/users",
  [authJwt.verifyToken, authJwt.isAdmin],
  UserController.createUser
);

module.exports = UserRouter;
