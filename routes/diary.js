import express from "express";
import { userToken } from "../services/jwtToken.js";
import { diaryUpdates, writeService } from "../services/userService.js";
let router = express.Router();

router.post("/write", writeService, userToken);

router.put("/:id", diaryUpdates, userToken);

export default router;
