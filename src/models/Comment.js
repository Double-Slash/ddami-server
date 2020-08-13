import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  content: { type: String },
  created: {
    type: Date,
    default: Date.now,
  },

  id: mongoose.Schema.Types.ObjectId,
});

const model = mongoose.model("Comment", CommentSchema);

export default model;

//  created: {
// type: String,
// default: moment().format("YYYY년 MM월 DD일 HH:mm:ss")
//}
