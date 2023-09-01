const express = require("express");
const {register,login, addParcel, addInvoice, getAllParcels, getUser, putUser, postUser, deleteUser, getAllInvoices} = require("../controllers/user.controllers");
const {isAuth, isAdmin} = require("../../middlewares/auth");
const userRoutes = express.Router();

userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.put("/userParcel/:id", [isAuth], addParcel);
userRoutes.put("/userInvoice/:id", [isAuth], addInvoice);
userRoutes.get("/userAllParcels/:id", getAllParcels);
userRoutes.get("/userAllInvoices/:id", getAllInvoices);
userRoutes.get("", [isAdmin], getUser);
userRoutes.put("/:id", [isAuth], putUser);
// userRoutes.post("", postUser);
userRoutes.delete("/:id", [isAdmin], deleteUser);



module.exports= userRoutes;