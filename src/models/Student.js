import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  university: { type: String },
  department: { type: String },
  number: { type: Number },
  authImage: { type: String },
  id: mongoose.Schema.Types.ObjectId,
});

const model = mongoose.model("Student", StudentSchema);

export default model;
