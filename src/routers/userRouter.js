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
  postMyLikes,
  postLikeProducts,
  addLikeProduct,
  addFollow,
  postUploadComment,
} from "../controllers/userController";

import { multerImage } from "../multerMiddleware";
import { checkUser } from "../jwtMiddleware";
const userRouter = express.Router();

userRouter.post("/join", postJoin);
userRouter.post("/login", postLogin);
userRouter.post("/detail/:id", postUserDetail);
userRouter.get("/detail/:id", postUserDetail);
userRouter.post("/write/comment/:id", postUploadComment);
userRouter.post(
  "/upload/piece",
  checkUser,
  multerImage.array("img", 3),
  postUpload
);
userRouter.post("/like/piece/:id", checkUser, addLike);
userRouter.get("/like/piece/:id", checkUser, addLike);
userRouter.get("/follow/:id", checkUser, addFollow);
userRouter.post("/follow/:id", checkUser, addFollow);
userRouter.post("/like/product/:id", checkUser, addLikeProduct);
userRouter.post("/checkId", checkUserId);
userRouter.post("/auth", checkUser, postAuth);
userRouter.post("/mypieces", checkUser, postMyPieces);
userRouter.post("/myInfo", checkUser, postMyInfo);
userRouter.post("/mylikes", checkUser, postMyLikes);
userRouter.post("/like/products", checkUser, postLikeProducts);
userRouter.post(
  "/auth/student",
  checkUser,
  multerImage.single("img"),
  authStudent
);

export default userRouter;
