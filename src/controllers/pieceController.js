import Piece from "../models/Piece";
import { checkLikeUser } from "./apiController";

export const getPieceDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  const piece = await Piece.findOne({ _id: id }).populate({
    path: "author",
    select: "userNickname",
  });
  const obj = piece.toObject();
  obj.likeByUser = checkLikeUser(piece.like, req);
  res.json({ result: 1, obj });
};
