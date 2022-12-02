import express from "express";
import { tokenMiddleware, tokenMiddleware2, tokenMiddleware3 } from "../services/middleware.js";

import { diaryRemove, diaryUpdates, writeService } from "../services/userService.js";
let router = express.Router();

router.post("/write", tokenMiddleware2, writeService);

router.put("/:id", tokenMiddleware, diaryUpdates);

router.delete("/:id", tokenMiddleware3, diaryRemove);

export default router;
