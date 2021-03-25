"use strict";
const { SocialController } = require("../controllers");
const express = require("express");
const { authJwt } = require("../middleware");
const SocialRouter = express.Router();

SocialRouter.post(
  "/social",
  [authJwt.verifyToken],
  SocialController.createSocial
);
SocialRouter.get(
  "/social/:socialId",
  [authJwt.verifyToken],
  SocialController.getSocialById
);
SocialRouter.get(
  "/socials/:username",
  [authJwt.verifyToken],
  SocialController.getAllSocialByUsername
);
SocialRouter.get(
  "/socials",
  [authJwt.verifyToken],
  SocialController.getAllSocial
);
SocialRouter.put(
  "/social/:socialId",
  [authJwt.verifyToken],
  SocialController.updateSocial
);
SocialRouter.delete(
  "/social/:socialId",
  [authJwt.verifyToken],
  SocialController.deleteSocial
);

module.exports = SocialRouter;
