import { userData, userLogin, userRemove } from "../services/userService.js";
import express from "express";

let router = express.Router();

router.post("/join", userData);

router.post("/login", userLogin);

router.delete("/:id", userRemove);

export default router;
