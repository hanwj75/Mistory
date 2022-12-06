import express from "express";
import { tokenMiddleware} from "../services/middleware.js";

import { diaryRemove, diaryUpdates, writeService } from "../services/userService.js";
let router = express.Router();

router.post("/write", tokenMiddleware, writeService);

router.put("/:id", tokenMiddleware, diaryUpdates);

router.delete("/:id", tokenMiddleware, diaryRemove);

export default router;
