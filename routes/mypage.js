import express from "express";
import { userToken } from "../services/jwtToken.js";
import { userPage } from "../services/userService.js";

let router = express.Router();

router.get("/:id", userPage);

router.put("/update/:id");

export default router;
