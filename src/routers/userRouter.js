import express from "express";
import {
  postJoin,
  postLogin,
  postUpload,
  postUserDetail,
  addLike,
  checkUserId,
  postAuth,
  postMyPieces,
  authStudent,
  postMyInfo,
} from "../controllers/userController";

import { multerImage } from "../multerMiddleware";
import { checkUser } from "../jwtMiddleware";
const userRouter = express.Router();

userRouter.post("/join", postJoin);
userRouter.post("/login", postLogin);
userRouter.post("/detail/:id", postUserDetail);
userRouter.get("/detail/:id", postUserDetail);
userRouter.post(
  "/upload/piece",
  checkUser,
  multerImage.array("img", 3),
  postUpload
);
userRouter.post("/like/:id", checkUser, addLike);
userRouter.post("/checkId", checkUserId);
userRouter.post("/auth", checkUser, postAuth);
userRouter.post("/mypieces", checkUser, postMyPieces);
userRouter.post("/myInfo", checkUser, postMyInfo);
userRouter.post(
  "/auth/student",
  checkUser,
  multerImage.single("img"),
  authStudent
);

export default userRouter;
