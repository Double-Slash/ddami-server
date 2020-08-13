import express from "express";
import { getCommentDetail } from "../controllers/commentController";
import { checkUser } from "../jwtMiddleware";

const commentRouter = express.Router();

commentRouter.get("/detail/:id", checkUser, getCommentDetail);
commentRouter.post("/detail/:id", checkUser, getCommentDetail);

export default commentRouter;
