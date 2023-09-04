const express = require("express")
const {getParcel, getParcelInfo, postParcel, putParcel, deleteParcel, addCalendarToParcel} = require("../controllers/parcel.controllers")
const {isAuth, isAdmin} = require("../../middlewares/auth")
const upload = require ("../../middlewares/upload.file")

const parcelRoutes = express.Router();

// parcelRoutes.get("/:id", getParcelInfo);
parcelRoutes.get("", [isAuth], getParcel);
parcelRoutes.post("", postParcel);
parcelRoutes.put("/:id", putParcel);
parcelRoutes.delete("/delete/:id/:user", deleteParcel);
parcelRoutes.get("/:id", getParcelInfo);

module.exports= parcelRoutes;