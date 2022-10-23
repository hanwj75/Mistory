import jwt from "jsonwebtoken";
import { db } from "../app.js";
//user
//회원가입
export const userData = (req, res) => {
  db.collection("user").insertOne(
    {
      userid: req.body.userId,
      password: req.body.password,
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      userPhone: req.body.userPhone,
    },
    (err, result) => {
      res.json({ join: result });
    }
  );
};

//로그인
export const userLogin = (req, res) => {
  const { userId, password } = req.body;
  db.collection("user").findOne({ userId: userId, password: password }, (err, result) => {
    if (!result) {
      res.status(400).json({ message: "아이디가 틀렸습니다." });
      return;
    }
    console.log(result);
    if (result.password !== password) {
      res.status(400).json({ message: "비밀번호가 틀렸습니다." });
      return;
    }

    const secretKey = process.env.SECRET_KEY;

    jwt.sign({ userId }, secretKey, (err, token) => {
      if (err) {
        console.log(err);
        return;
      }
      res.json({ token });
    });
  });
};
//회원탈퇴

export const userRemove = (req, res) => {
  req._id = req.userId;
  let removeId = { removeId: req._id };
  db.collection("user").deleteOne(removeId, (err, result) => {
    console.log("삭제완료");
    if (!result) {
      res.status(400).json({ message: "삭제실패" });
    }
  });
};
//diary

//일기 쓰기
export const writeService = (req, res) => {
  const diaryPost = req.body.contents;

  db.collection("diaryCounter").findOne({ name: "diaryNumber" }, (err, result) => {
    console.log(result.allDiary);
    let allDiaryList = result.allDiary;

    db.collection("diary").insertOne(
      {
        _id: allDiaryList + 1,
        contents: diaryPost,
      },
      function (err, result) {
        console.log(result);
        db.collection("diaryCounter").updateOne(
          { name: "diaryNumber" },
          { $inc: { allDiary: 1 } },
          function (err, result) {
            if (err) {
              return console.log(err);
            }
          }
        );
      }
    );
  });
};

//일기 수정하기

//db에 콜렉선 다이어리에 저장된 콘텐츠오브젝트 중 하나를 찾아서 수정 후 업데이트 해줌
export const diaryUpdates = (req, res) => {
  const diaryPost = req.body.contents;
  db.collection("diary").updateOne(
    { _id: parseInt(req.body.diaryId) },
    { $set: { contents: diaryPost } },
    (err, result) => {
      if (!result) {
        res.status(400).json({ message: "수정실패" });
      }
    }
  );
};
