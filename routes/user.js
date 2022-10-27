import { userData, userLogin, userRemove } from "../services/userService.js";
import express from "express";
import { loginToken, userToken } from "../services/jwtToken.js";
let router = express.Router();

router.post("/join", userData);

router.post("/login", userLogin, loginToken);

router.delete("/:id", userToken, userRemove);

export default router;
