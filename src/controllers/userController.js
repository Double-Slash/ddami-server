import User from "../models/User";
import jwt from "jsonwebtoken";

const checkAndroid = (req) => {
  return req.headers["user-agent"].match(/Android/i) == null ? false : true;
};

export const postJoin = async (req, res) => {
  const {
    body: {
      userEmail,
      userPassword,
      userName,
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
      const user = await User({
        userEmail,
        userPassword,
        userName,
        userSex,
        userBirth,
        userPhone,
        likeField,
      });
      await User.create(user);

      res.json({ result: 1, message: "회원가입 성공" });
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
    res.json({ result: 1, message: "자동 로그인 성공" });
  }
};

export const postLogin = async (req, res) => {};
