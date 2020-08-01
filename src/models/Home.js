import mongoose from "mongoose";

const HomeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  imageUrl: { type: String },
  stateMessage: {
    type: String,
    default: `안녕하세요 만나서 반가워요`,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  id: mongoose.Schema.Types.ObjectId,
});

const model = mongoose.model("Home", HomeSchema);

export default model;

//  created: {
// type: String,
// default: moment().format("YYYY년 MM월 DD일 HH:mm:ss")
//}
