import mongoose from "mongoose";

const SearchSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    searches: [{ type: String }],
    id: mongoose.Schema.Types.ObjectId,
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  }
);

SearchSchema.methods.saveSearch = (searchingBy) => {
  if (this.searches.length < 10) {
    this.searches.push(searchingBy);
    this.save();
    return;
  } else {
    this.searches.shift();
    this.searches.push(searchingBy);
    return this.save();
  }
};

const model = mongoose.model("Search", SearchSchema);

export default model;

//  created: {
// type: String,
// default: moment().format("YYYY년 MM월 DD일 HH:mm:ss")
//}
