import Piece from "../models/Piece";
import { checkInclude } from "./apiController";

export const getPieceDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  const piece = await Piece.findOne({ _id: id }).populate({
    path: "author",
    select: "userName",
  });
  if (piece == null)
    res.json({ result: 0, message: "없거나 사라진 작품입니다." });
  else {
    const obj = piece.toObject();
    obj.likeByUser = checkInclude(piece.like, req);
    res.json({ result: 1, piece: obj });
  }
};
