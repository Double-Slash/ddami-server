import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, trim: true, unique: true },
  userPassword: { type: String, required: true },
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
  followerCount: { type: Number, default: 0 },
  state: { type: Boolean, default: false },
  myPieces: [{ type: mongoose.Schema.Types.ObjectId, ref: "Piece" }],
  like: [{ type: mongoose.Schema.Types.ObjectId, ref: "Piece" }],
  likeProduct: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  likeMaterial: [{ type: mongoose.Schema.Types.ObjectId, ref: "Material" }],
  imageUrl: {
    type: String,
    default: "http://222.251.129.150/uploads/default.jpg",
  },
  stateMessage: {
    type: String,
    default: `안녕하세요 만나서 반가워요`,
  },
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
