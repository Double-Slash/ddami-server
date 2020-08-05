import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    fileUrl: [{ type: String }],
    title: { type: String },
    price: { type: Number },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    hasField: [{ type: String }],
    views: { type: Number, default: 0 },
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    state: { type: Number, default: 0, enum: [-1, 0, 1] },
    created: {
      type: Date,
      default: Date.now,
    },
    id: mongoose.Schema.Types.ObjectId,
  },
  { toJSON: { virtuals: true } }
);
ProductSchema.virtual("likeCount").get(function () {
  return this.like.length;
});

const model = mongoose.model("Product", ProductSchema);

export default model;
