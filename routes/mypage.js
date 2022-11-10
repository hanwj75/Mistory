import express from "express";
import { userPage, userPageUpdate } from "../services/userService.js";

let router = express.Router();

router.get("/:id", userPage);

router.put("/update/:id", userPageUpdate);

export default router;
