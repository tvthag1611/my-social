"use strict";
const SocialController = require("../controllers/SocialController");
const express = require("express");
const SocialRouter = express.Router();

SocialRouter.post("/social", SocialController.createSocial);
SocialRouter.get("/social/:socialId", SocialController.getSocialById);
SocialRouter.get("/socials/:username", SocialController.getAllSocialByUsername);
SocialRouter.get("/socials", SocialController.getAllSocial);
SocialRouter.put("/social/:socialId", SocialController.updateSocial);
SocialRouter.delete("/social/:socialId", SocialController.deleteSocial);

module.exports = SocialRouter;
