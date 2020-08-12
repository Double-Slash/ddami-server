import mongoose from "mongoose";

const MaterialSchema = new mongoose.Schema(
  {
    fileUrl: [{ type: String }],
    title: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    locationName: { type: String, required: true },
    location: {
      type: [Number],
      default: [0, 0],
      index: "2dsphere",
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    hasField: [{ type: String }],
    views: { type: Number, default: 0 },
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    likeCount: { type: Number, default: 0 },
    state: { type: Number, default: 0, enum: [-1, 0, 1] },
    created: {
      type: Date,
      default: Date.now,
    },
    id: mongoose.Schema.Types.ObjectId,
  },
  { toJSON: { virtuals: true } }
);
// MaterialSchema.virtual("likeCount").get(function () {
//   return this.like.length;
// });

const model = mongoose.model("Material", MaterialSchema);

export default model;
