import User from "../models/User";
import Piece from "../models/Piece";
import Student from "../models/Student";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const checkAndroid = (req) => {
  return req.headers["user-agent"].match(/Android/i) == null ? false : true;
};
export const checkUserId = async (req, res) => {
  const {
    body: { userId },
  } = req;
  const user = await User.findOne({ userId });
  if (user === null) {
    res.json({ result: 1, message: "가능한 ID입니다." });
  } else {
    res.json({ result: 0, message: "이미 존재하는 ID입니다." });
  }
};
export const postAuth = async (req, res) => {
  const user = await User.findById(req.decoded._id).select("imageUrl userName");
  if (user === null)
    res.json({ result: 0, message: "없어진 계정이거나 없는 계정입니다." });
  else {
    res.json({ result: 1, myInfo: user });
  }
};

export const postJoin = async (req, res) => {
  const {
    body: {
      userId,
      userPassword,
      userName,
      userSex,
      userBirth,
      userPhone,
      likeField,
    },
  } = req;
  try {
    const user = await User.findOne({ userId });
    if (user !== null) {
      res.json({ result: 0, message: "이미 존재하는 ID가 있습니다." });
    } else {
      const user = await User({
        userId,
        userPassword,
        userName,
        userSex,
        userBirth,
        userPhone,
        likeField,
      });
      const signedUser = await User.create(user);

      res.json({ result: 1, message: "회원가입 성공" });
    }
  } catch (error) {
    console.log(error);
    res.json({ result: 0, message: "DB 오류" });
  }
};

export const postLogin = async (req, res) => {
  console.log(req);
  if (!req.decoded) {
    const {
      body: { userId, userPassword, deviceToken },
    } = req;
    //SERCRET
    const secret = req.app.get("jwt-secret");
    const user = await User.findOne({ userId });
    console.log(req);
    if (user) {
      if (user.userId === userId && user.userPassword === userPassword) {
        //토큰 발급
        jwt.sign(
          {
            _id: user._id,
            userId: user.userId,
          },
          secret,
          {
            expiresIn: "7d", //만료기간
            issuer: "ddami.com",
            subject: "userInfo",
          },
          (err, token) => {
            if (!err) {
              console.log("로그인 성공");
              if (checkAndroid(req)) {
                if (user.deviceToken) {
                  if (user.deviceToken !== deviceToken) {
                    user.deviceToken = deviceToken;

                    user.save((e) => {
                      if (!e) {
                        console.log("디바이스 토큰 변경 완료");
                      }
                    });
                  }
                } else {
                  user.deviceToken = deviceToken;
                  user.save((e) => {
                    if (!e) {
                      console.log("디바이스 토큰 생성 완료");
                    }
                  });
                }
              }
              res.json({
                result: 0,
                message: `${userId}로 로그인 성공`,
                token,
              });
            }
          }
        );
      } else {
        res.json({
          result: 0,
          message: "로그인 실패. ID/PW를 확인해주세요",
        });
      }
    }
  } else {
    console.log(req.user);
    res.status(200).json({ result: 1, message: "자동 로그인 성공" });
  }
};

export const postUpload = async (req, res) => {
  console.log(req);
  const {
    body: { title, description, hasField },
  } = req;
  try {
    const user = await User.findOne({ userId: req.decoded.userId });
    const fileUrl = [];
    if (req.files) {
      for (var e of req.files)
        fileUrl.push(`${process.env.BASE_URL}/uploads/${e.filename}`);
    }
    const piece = await Piece({
      fileUrl,
      title,
      description,
      hasField,
      author: user._id,
    });
    piece.save((err) => {
      if (!err) {
        user.myPieces.push(piece._id);
        user.save((err) => {
          if (err) res.json({ result: 0, message: "db error" });
        });
        res
          .status(201)
          .json({ result: 1, message: "성공적으로 업로드 했습니다." });
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ result: 0, message: "db오류" });
  }
};

export const postUserDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  const user = await User.findById(id)
    .select(
      "userName userId follow follower likeField state imageUrl stateMessage"
    )
    .populate({
      path: "myPieces",
      select: "fileUrl title description like likeCount views",
    });
  if (user === null) {
    res.json({ result: 0, message: "사라진 사용자입니다." });
  } else {
    //닉네임 팔로워수
    let obj = user.toObject();
    obj.follow = user.follow.length;
    obj.follower = user.follower.length;
    obj.myPieces.reverse();

    console.log(obj);
    res.json({ result: 0, user: obj });
  }
};

export const addLike = async (req, res) => {
  const {
    params: { id },
  } = req;
  const piece = await Piece.findOne({ _id: id });
  if (piece == null)
    res.status(404).json({ result: 0, message: "사라지거나 없는 작품입니다." });
  else {
    try {
      const user = await User.findById(req.decoded._id);
      const pos = user.like.indexOf(id);

      if (pos != -1) {
        piece.like.splice(piece.like.indexOf(req.decoded._id), 1);
        piece.likeCount--;
        piece.save((err) => {
          if (err) {
          }
          user.like.splice(pos, 1);
          user.save();
        });
        res.json({ result: 1, message: "좋아요 취소" });
      } else {
        piece.like.push(req.decoded._id);
        piece.likeCount++;
        piece.save((err) => {
          if (err) {
          }
          user.like.push(id);
          user.save();
        });
        res.json({ result: 1, message: "좋아요 성공" });
      }
    } catch (err) {
      res.status(500).json({ result: 0, message: "DB 오류" });
    }
  }
};

export const postMyPieces = async (req, res) => {
  const user = await User.findById(req.decoded._id)
    .select("myPieces")
    .populate({ path: "myPieces", select: "fileUrl state" });
  if (user === null)
    res.json({ result: 0, message: "없어진 계정이거나 없는 계정입니다." });
  else {
    res.json({ result: 1, mypieces: user.myPieces });
  }
};

export const authStudent = async (req, res) => {
  let {
    body: { university, department, number, likeField },
  } = req;
  const user = await User.findById(req.decoded._id);
  if (user === null) {
  } else if (user.state === true)
    res.json({ result: 0, message: "이미 인증된 사용자입니다." });
  else {
    try {
      if (!likeField) likeField = [];
      const student = await Student({
        user: req.decoded._id,
        university,
        department,
        number,
        authImage: req.file
          ? `${process.env.BASE_URL}/uploads/${req.file.filename}`
          : "",
      });
      await Student.create(student);

      user.state = true;
      user.likeField = likeField;
      // user.likeField.concat(
      //   likeField.filter((e) => user.likeField.indexOf(e) == -1)
      // );
      console.log(user);
      await user.save((err) => {
        if (!err) res.json({ result: 1, message: "미대생 인증 되었습니다." });
        else {
          console.log(err);
          res.json({ result: 0, message: "DB 오류" });
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ result: 0, message: "DB 오류" });
    }
  }
};

export const postMyInfo = async (req, res) => {
  const user = await User.findById(req.decoded._id)
    .select("userId userName myPieces likeField follow followerCount")
    .populate({ path: "myPieces", select: "fileUrl" });
  if (user === null)
    res.json({ result: 0, message: "없어진 계정이거나 없는 계정입니다." });
  else {
    console.log(user);
    let obj = user.toObject();
    const student = await Student.findOne({ user: user._id }).select(
      "university department"
    );
    obj.follow = obj.follow.length;
    if (student === null) res.json({ result: 1, mypieces: user.myPieces });
    else {
      obj.student = student.toObject();
      res.json({ result: 1, myInfo: obj });
    }
  }
};
