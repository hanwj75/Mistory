import jwt from "jsonwebtoken";
import { db } from "../app.js";
import bcrypt from "bcrypt";
import { verifyToken } from "./jwtToken.js";
import { syncBuiltinESMExports } from "module";


let today = new Date();   

let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1;  // 월
let date = today.getDate();  // 날짜
let day = today.getDay();  // 요일

let createdAt=(year + '/' + month + '/' + date)
//user
//회원가입

//저장하려는 유저의 id와 db의 저장된 id가 같다면 오류,다르다면 회원가입을 진행시킴

export const userData = async (req, res) => {
  const { userId, password, userName, userEmail, userPhone } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  db.collection("user").findOne({ userId }, (err, result) => {
    if (result !== null) {
      res.status(400).json({ message: "중복된 아이디 입니다.", err });
    } else {
      db.collection("user").insertOne(
        {
          userId: req.body.userId,
          password: hashed,
          userName: req.body.userName,
          userEmail: req.body.userEmail,
          userPhone: req.body.userPhone,
        },
        (err, result) => {
          console.log(result);
          res
            .status(200)
            .json({ message: "회원가입 성공!", userId, hashed, userName, userEmail, userPhone });
        }
      );
    }
  });
};

//로그인
export const userLogin = (req, res) => {
  const { userId, password } = req.body;
  db.collection("user").findOne({ userId: userId }, async (err, result) => {
    const { userName, userEmail, userId, userPhone } = result;
    const hashPassword = result.password;
    const loginCheck = await bcrypt.compare(password, hashPassword);

    if (!result) {
      res.status(400).json({ message: "아이디가 틀렸습니다." });
      return;
    }
    console.log(result);
    if (loginCheck === false) {
      console.log(loginCheck);
      res.status(400).json({ message: "비밀번호가 틀렸습니다." });
      return;
    }
    if (result) {
      const secretKey = process.env.SECRET_KEY;

      jwt.sign({ userId }, secretKey, (err, token) => {
        if (err) {
          console.log(err);
          return;
        }
        res.status(200).json({
          message: "로그인 성공",
          token,
          userId,
          userName,
          userEmail,
          userPhone,
        });
      });
    }
  });
};
//회원탈퇴
// 삭제하려는 계정의 id와 db에 user콜렉션에 저장된 userId와 일치하면 삭제시켜줌
export const userRemove = (req, res) => {
  const deleteToken = verifyToken(req)
  const deleteUser = deleteToken

 
  db.collection('user').findOne({userId:req.params.id},(err,dbId)=>{
    const {userId}=dbId
    console.log("id====>",deleteUser)
  console.log("userId====>",userId)
    
    if(deleteUser !== userId){
      res.status(400).json({message:"정보가 틀립니다.",err})
      return 
    }if(deleteUser===userId){
  db.collection('user').deleteOne(dbId,(err,result)=>{
    console.log('result-->',result)
    console.log("token==>",deleteUser)
    
    res.status(200).json({message:"삭제완료"})
   
  })}})}

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
        createdAt,
      },
      function (err, result) {
        console.log(createdAt);
        console.log(result);
        db.collection("diaryCounter").updateOne(
          { name: "diaryNumber" },
          { $inc: { allDiary: 1 } },
          function (err, result) {
            if (err) {
              return console.log(err);
            } else {
              res.status(200).json({ message: "작성완료" });
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
  const { contents } = req.body;
  const updatedAt = new Date();

  db.collection("diary").updateOne(
    { _id: parseInt(req.body.id) },
    { $set: { contents, updatedAt: updatedAt } },
    (err, result) => {
      if (!result) {
        res.status(400).json({ message: "수정실패" });
      }
    }
  );
};

//일기 삭제하기

//diary 콜렉션에 있는 데이터중 _id가 내가 삭제한 게시물의 _id와 같으면 삭제시켜줌
//db에서 다이어리의_id를 찾아서 
// export const diaryRemove = (req, res) => {
//   db.collection("diary").deleteOne({ _id: parseInt(req.params.id) }, (err, result) => {
//     console.log("삭제완료");
//     res.status(200).json({ message: "삭제성공" });
//     if (!result) {
//       res.status(400).json({ message: "삭제실패" });
//     }
//   });
// };
export const diaryRemove = (req, res) => {

  const diaryId = parseInt(req.params.id)
  db.collection('diary').findOne({_id:diaryId} ,(err,result)=>{
    const diaryNum = result
    let {_id}=diaryNum
    console.log("==>",result)
    if(_id===null){
      res.status(400).json({message:"삭제할 게시물이 존재하지않음",err})
   return }
  if(_id !==diaryId){
    res.status(400).json({message:"삭제실패"})
    return } 
   else{ db.collection('diary').deleteOne({_id:diaryId} ,(err,result)=>{
  console.log('삭제결과--->',result,"삭제하려는정보-->",_id,"삭제한정보-->",diaryId)
   res.status(200).json({message:"삭제성공"})
   return
  
 })}})
 
 
}//일기삭제 수정중

//일기 목록
//diary 콜렉션에 있는 파일 전부 보여줌
export const diarysList = (req, res) => {
  db.collection("diary")
    .find()
    .toArray((err, result) => {
      res.json({ result });
      console.log(result);
    });
};

//마이페이지
//로그인한 사람이 마이페이지로 들어가면 id,이름,이메일,폰번호를 보여줌
export const userPage = (req, res) => {
  db.collection("user").findOne({ userId: req.params.id }, (err, result) => {
    console.log(result);
    ;
    if(result===null){
      res.status(400).json({message:"페이지를 찾을수없음",err})
   return false
  }else{ const { userId, userName, userEmail, userPhone } = result
  res.json({ userMypage: userId, userName, userEmail, userPhone })
    
  }});
};

//마이페이지 회원정보 수정
//회원정보 수정 요청이 오면 이메일,폰번호,비밀번호를 바꿀수있음
//db의 있는 유저의 데이터중 id가 일치하는 데이터의 정보를 수정한 데이터로 업데이트함

export const userPageUpdate = async(req, res) => {
  const { userEmail, userPhone, password } = req.body;
  const hashed = await bcrypt.hash(password, 10)
  db.collection("user").updateOne(
    { userId: req.params.id },
    {
      $set: { userEmail, userPhone, password:hashed },
    },
    (err, result) => {
      if(!result){
        res.status(400).json({message:'수정안됌',err})
      }else{res.status(200).json({message:"수정완료",userEmail,userPhone,password:hashed})}
    }
  );
};
//ㄴㅁㅇㅁㄴㅇ
