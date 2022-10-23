import jwt from "jsonwebtoken";
import { db } from "../app.js";
//user
//회원가입
export const userData = (req, res) => {
  db.collection("IDcounter").findOne({ name: "userIdNumber" }, (err, result) => {
    console.log(result.ALLID);

    let totalID = result.ALLID;

    db.collection("user").insertOne({
      _id: totalID + 1,
      userid: req.body.userId,
      password: req.body.password,
      userName: req.body.userName,
      userEmail: req.body.userEmail,
      userPhone: req.body.userPhone,

      function(req, res) {
        console.log(err);
        console.log("저장완료");
        db.collection("IDcounter").updateOne(
          { name: "userIdNumber" },
          { $inc: { ALLID: 1 } },
          (err, result) => {
            if (result) {
              res.status(200);
            } else if (err) {
              res.status(400).json({ message: "문제가 발생했습니다." });
            }
          }
        );
      },
    });
  });
};

//로그인
export const userLogin = (req, res) => {
  console.log("1313");
  const { userId, password } = req.body;
  db.collection("user").findOne({ userId }, (err, result) => {
    if (!result) {
      console.log("err");
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
  req.user._id = parseInt(req.user._id);
  let removeId = { removeId: req.user._Id };
  db.collection("user").deleteOne(removeId, (err, result) => {
    console.log("삭제완료");
    if (!result) {
      res.status(400).json({ message: "삭제실패" });
    }
  });
};
//diary

//일기 쓰기
export const writeService = async (req, res) => {
  const diaryPost = req.body.contents;

  await db.collection("diary").insertOne({ contents: diaryPost }, (err, result) => {
    if (result) {
      db.collection("diaryCounter").findOne({ name: "diaryNumber" }, (err, result) => {
        console.log(result.allDiary);

        let totalDiary = result.allDiary;

        db.collection("diary").insertOne({
          _id: totalDiary - 1,
          contents: diaryPost,

          function(req, res) {
            console.log("저장완료");
            db.collection("diaryCounter").updateOne(
              { name: "diaryNumber" },
              { $inc: { allDiary: 1 } },
              (err, result) => {
                if (result) res.status(200).json({ message: "쓰기 완료" });
              }
            );
          },
        });
      });
    }
  });
};

//일기 수정하기

//db에 콜렉선 다이어리에 저장된 콘텐츠오브젝트 중 하나를 찾아서 수정 후 업데이트 해줌
export const diaryUpdates = (req, res) => {
  const diaryPost = req.body.contents;
  db.collection("diary").updateOne(
    { _id: parseInt(req.body.diaryid) },
    { $set: { contents: diaryPost } },
    (err, result) => {
      if (!result) {
        res.status(400).json({ message: "수정실패" });
      }
    }
  );
};
