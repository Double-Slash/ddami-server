import Piece from "../models/Piece";

export const getPieceDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  const piece = await Piece.findOne({ _id: id }).populate({
    path: "author",
    select: "userNickname",
  });
  res.json({ result: 1, piece });
};
