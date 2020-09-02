import Piece from "../models/Piece";
import Comment from "../models/Comment";
import User from "../models/User";
import { checkInclude, docToJSON } from "./apiController";
import userRouter from "../routers/userRouter";

export const getPieceDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  const piece = await Piece.findOne({ _id: id }).populate({
    path: "author",
    select: "userId imageUrl",
  });
  if (piece == null)
    res.json({ result: 0, message: "없거나 사라진 작품입니다." });
  else {
    let obj = piece.toObject();

    obj = await Comment.populate(obj, {
      path: "comments",
      select: "user content comments created",
    });
    let commentsInfo = await User.populate(obj.comments, {
      path: "user",
      select: "imageUrl userId userName",
    });

    obj.comments = commentsInfo;
    obj.likeByUser = checkInclude(piece.like, req);
    res.json({ result: 1, piece: obj });
  }
};
