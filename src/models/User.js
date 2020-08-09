import mongoose from "mongoose";
import Home from "./Home";

const UserSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, trim: true, unique: true },
  userPassword: { type: String, required: true },
  userNickname: { type: String, required: true, unique: true },
  userName: { type: String },
  userBirth: { type: String },
  userPhone: { type: String },
  userSex: {
    type: String,
    enum: ["male", "female"],
  },
  likeField: [{ type: String }],
  follow: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  follower: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  followerCount: { type: Number },
  state: { type: Boolean, default: false },
  myPieces: [{ type: mongoose.Schema.Types.ObjectId, ref: "Piece" }],
  like: [{ type: mongoose.Schema.Types.ObjectId, ref: "Piece" }],
  home: { type: mongoose.Schema.Types.ObjectId, ref: "Home" },
  created: {
    type: Date,
    default: Date.now,
  },
  deviceToken: { type: String },
  id: mongoose.Schema.Types.ObjectId,
});

const model = mongoose.model("User", UserSchema);

export default model;

//  created: {
// type: String,
// default: moment().format("YYYY년 MM월 DD일 HH:mm:ss")
//}
