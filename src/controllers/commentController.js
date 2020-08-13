import Comment from "../models/Comment";
import User from "../models/User";

export const getCommentDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  const comment = await Comment.findOne({ _id: id }).populate({
    path: "comments",
    select: "user content comments created",
  });
  if (comment == null) res.json({ result: 0, message: "사라진 댓글입니다" });
  else {
    res.json({ result: 1, comment });
  }
};
