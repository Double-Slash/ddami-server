import express from "express";
import {
  postJoin,
  postLogin,
  postUpload,
  postUserDetail,
  addLike,
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

export default userRouter;
