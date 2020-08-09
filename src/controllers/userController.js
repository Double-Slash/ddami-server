import User from "../models/User";
import Piece from "../models/Piece";
import Home from "../models/Home";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const checkAndroid = (req) => {
  return req.headers["user-agent"].match(/Android/i) == null ? false : true;
};

export const postAuth = async (req, res) => {
  const user = await User.findById(req.decoded._id);
  if (user === null)
    res.josn({ result: 0, message: "없어진 계정이거나 없는 계정입니다." });
  else {
  }
};
export const postJoin = async (req, res) => {
  const {
    body: {
      userEmail,
      userPassword,
      userName,
      userNickname,
      userSex,
      userBirth,
      userPhone,
      likeField,
    },
  } = req;
  try {
    const user = await User.findOne({ userEmail });
    if (user !== null) {
      res.json({ result: 0, message: "이미 존재하는 ID가 있습니다." });
    } else {
      const userNickName = await User.findOne({ userNickname });
      if (userNickName !== null)
        res.json({ result: 0, message: "이미 사용하는 닉네임이 있습니다." });
      else {
        const user = await User({
          userEmail,
          userPassword,
          userName,
          userNickname,
          userSex,
          userBirth,
          userPhone,
          likeField,
        });
        const signedUser = await User.create(user);
        const home = await Home.create({ user: user._id });
        await User.findByIdAndUpdate(signedUser, { home: home._id }, (err) => {
          if (err) {
            console.log(err);
            return;
          }
        });
        res.json({ result: 1, message: "회원가입 성공" });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ result: 0, message: "DB 오류" });
  }
};

export const postLogin = async (req, res) => {
  if (!req.decoded) {
    const {
      body: { userEmail, userPassword, deviceToken },
    } = req;
    //SERCRET
    const secret = req.app.get("jwt-secret");
    const user = await User.findOne({ userEmail });
    console.log(req);
    if (user) {
      if (user.userEmail === userEmail && user.userPassword === userPassword) {
        //토큰 발급
        jwt.sign(
          {
            _id: user._id,
            userEmail: user.userEmail,
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
                message: `${userEmail}로 로그인 성공`,
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
    const user = await User.findOne({ userEmail: req.decoded.userEmail });
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
    .select("userNickname follow follower likeField state")
    .populate({
      path: "myPieces",
      select: "fileUrl title description like likeCount views",
    });
  const home = await Home.findOne({ user: id });
  //닉네임 팔로워수
  let obj = user.toObject();
  obj.follow = user.follow.length;
  obj.follower = user.follower.length;
  obj.myPieces.reverse();
  obj.stateMessage = home.stateMessage;

  home.imageUrl ? (obj.imageUrl = home.imageUrl) : (obj.imageUrl = "");
  console.log(obj);
  res.json({ result: 0, user: obj });
};

export const addLike = async (req, res) => {
  const {
    params: { id },
  } = req;
  const piece = await Piece.findOne({ _id: id });
  if (piece == null)
    res.status(404).json({ result: 0, message: "사라지거나 없는 작품입니다." });
  else {
    const user = await User.findById(req.decoded._id);
    try {
      piece.like.push(req.decoded._id);
      piece.likeCount++;
      piece.save((err) => {
        if (err) {
        }
        user.like.push(id);
        user.save();
      });
      res.json({ result: 1, message: "좋아요 성공" });
    } catch (err) {
      res.status(500).json({ result: 0, message: "DB 오류" });
    }
  }
};
