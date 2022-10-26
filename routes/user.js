import { userData, userLogin, userRemove } from "../services/userService.js";
import express from "express";
import { loginToken, userToken } from "../services/jwtToken.js";
let router = express.Router();

router.post("/join", userData);

router.post("/login", userLogin, loginToken);

//내 정보의  회원탈퇴 버튼을 누르면 req.body에 저장된 id와 db 콜렉션중 user에 저장된 동일한 id의 오브젝트를 삭제시키는 기능

router.delete("/:id", userRemove, userToken);

export default router;
