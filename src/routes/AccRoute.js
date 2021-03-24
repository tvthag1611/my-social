"use strict";
const AccController = require("../controllers/UserController");
const express = require("express");
const AccRouter = express.Router();

AccRouter.post("/users/login", AccController.login);
AccRouter.post("/users", AccController.register);
AccRouter.get("/users/:username", AccController.getUser);
AccRouter.put("/users/:username", AccController.updateUser);

module.exports = AccRouter;
