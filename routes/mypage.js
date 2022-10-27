import express from "express";
import { userToken } from "../services/jwtToken.js";
import { userPage, userPageUpdate } from "../services/userService.js";

let router = express.Router();

router.get("/:id", userToken, userPage);

router.put("/update/:id", userToken, userPageUpdate);

export default router;
