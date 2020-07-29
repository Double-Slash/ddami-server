import express from "express";
import { postJoin, postLogin, postUpload } from "../controllers/userController";
import { multerImage } from "../multerMiddleware";
const userRouter = express.Router();

userRouter.post("/join", postJoin);
userRouter.post("/login", postLogin);
userRouter.post("/upload/piece", multerImage.array("img", 3), postUpload);

export default userRouter;
