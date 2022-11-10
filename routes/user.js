import { userData, userLogin, userRemove } from "../services/userService.js";
import express from "express";
import { verifySignToken } from "../services/jwtToken.js";

let router = express.Router();

router.post("/join", userData);

router.post("/login", userLogin, verifySignToken);

router.delete("/:id", userRemove);

export default router;
