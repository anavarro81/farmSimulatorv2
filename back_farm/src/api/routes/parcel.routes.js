const express = require("express")
const {getParcel, getParcelInfo, postParcel, putParcel, deleteParcel} = require("../controllers/parcel.controllers")
const {isAuth, isAdmin} = require("../../middlewares/auth")
const upload = require ("../../middlewares/upload.file")

const parcelRoutes = express.Router();

parcelRoutes.get("", [isAuth], getParcel);
parcelRoutes.get("/:id", [isAuth], getParcelInfo);
parcelRoutes.post("", [isAdmin], postParcel);
parcelRoutes.put("/:id", putParcel);
parcelRoutes.delete("/:id", [isAdmin], deleteParcel);

module.exports= parcelRoutes;