const express = require("express")
const {getCalendar, postCalendar, putCalendar, deleteCalendar} = require("../controllers/calendar.controllers")
const {isAuth, isAdmin} = require("../../middlewares/auth");

const calendarRoutes = express.Router();

calendarRoutes.get("/:id", [isAuth], getCalendar);
calendarRoutes.post("", [isAuth], postCalendar);
calendarRoutes.put("/:id", [isAuth], putCalendar);
calendarRoutes.delete("/:id", [isAuth], deleteCalendar);


module.exports= calendarRoutes;