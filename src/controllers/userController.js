const checkExistUser = async (userEmail) => {
  try {
    const user = await User.findOne({ userEmail });
    return user === null ? false : true;
  } catch (err) {
    console.log(error);
    res.status(500);
  }
};

export const postJoin = async (req, res) => {
  console.log(req);
  const {
    body: { userEmail, userPassword, userName, userPhone, deviceToken },
  } = req;
  try {
    if (checkExistUser) {
      res.json({ result: 0, message: "이미 존재하는 ID가 있습니다." });
    } else {
      const user = await User({
        userEmail,
        userPassword,
        userName,
        userPhone,
      });
      await User.create(user);

      res.json({ result: 1, message: "회원가입 성공" });
    }
  } catch (error) {
    console.log(error);
    res.json({ result: 0, message: "DB 오류" });
  }
};

export const postLogin = async (req, res) => {};
