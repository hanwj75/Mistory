import express from "express";
import { tokenMiddleware } from "../services/middleware.js";
import { userPage, userPageUpdate } from "../services/userService.js";

let router = express.Router();

router.get("/:id", tokenMiddleware, userPage);

router.put("/update/:id", tokenMiddleware, userPageUpdate);

export default router;
