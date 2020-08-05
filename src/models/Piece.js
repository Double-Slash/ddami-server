import mongoose from "mongoose";

const PieceSchema = new mongoose.Schema(
  {
    fileUrl: [{ type: String }],
    title: { type: String },
    description: { type: String },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    hasField: [{ type: String }],
    views: { type: Number, default: 0 },
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    likeCount: { type: Number, default: 0 },
    created: {
      type: Date,
      default: Date.now,
    },
    id: mongoose.Schema.Types.ObjectId,
  },
  { toJSON: { virtuals: true } }
);

const model = mongoose.model("Piece", PieceSchema);

export default model;

// PieceSchema.virtual("likeCount").get(function () {
//   return this.like.length;
// });

//  created: {
// type: String,
// default: moment().format("YYYY년 MM월 DD일 HH:mm:ss")
//}

// {
//   toObject: {
//     transform: function (doc, ret) {
//       delete ret._id;
//     },
//   },
//   toJSON: {
//     transform: function (doc, ret) {
//       delete ret._id;
//     },
//   },
// }

// PieceSchema.methods.sort = function sort(sortingBy, cb) {
//   if (sortingBy === "L") return;
//   else if (sortingBy === "V") return;
// };
