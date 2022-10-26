import express from "express";
import { diaryUpdates, writeService } from "../services/userService.js";
let router = express.Router();

router.post("/write", writeService);

router.put("/:id", diaryUpdates);

export default router;
