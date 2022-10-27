import express from "express";
import { userToken } from "../services/jwtToken.js";
import { diaryRemove, diaryUpdates, writeService } from "../services/userService.js";
let router = express.Router();

router.post("/write", userToken, writeService);

router.put("/:id", userToken, diaryUpdates);

router.delete("/:id", userToken, diaryRemove);

export default router;
