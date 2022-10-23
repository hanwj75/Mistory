import { userData, userLogin, userRemove } from "../services/userService.js";
import express from "express";
let router = express.Router();

router.post("/join", userData);

router.post("/login", userLogin);

//내 정보의  회원탈퇴 버튼을 누르면 req.body에 저장된 id와 db 콜렉션중 user에 저장된 동일한 id의 오브젝트를 삭제시키는 기능

router.delete("/:id", userRemove);

export default router;
