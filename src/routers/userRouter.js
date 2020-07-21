import express from "express";

const userRouter = express.Router();

userRouter.post("/login", postLogin);
userRouter.post("/join", postJoin);

export default userRouter;
