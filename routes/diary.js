import express from "express";
import { userToken } from "../services/jwtToken.js";
import { diaryRemove, diaryUpdates, writeService } from "../services/userService.js";
let router = express.Router();

router.post("/write", writeService, userToken);

router.put("/:id", diaryUpdates, userToken);

router.delete("/:id", diaryRemove, userToken);

export default router;
