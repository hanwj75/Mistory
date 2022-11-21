import {userData, userLogin, userRemove } from "../services/userService.js";
import express from "express";
import { tokenMiddleware } from "../services/middleware.js";

let router = express.Router();

router.post("/join", userData);

router.post("/login", userLogin);

router.delete("/:id", tokenMiddleware, userRemove);

export default router;
