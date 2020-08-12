import Piece from "../models/Piece";
import User from "../models/User";

const allSearch = async (list, count) => {
  const pieces = await Piece.find()
    .sort({ created: -1 })
    .skip(list * count)
    .limit(count)
    .select("fileUrl title description like likeCount views")
    .populate({ path: "author", select: "userId imageUrl" });

  return pieces;
};

const allFieldSearch = async (field, list, count) => {
  const pieces = await Piece.find()
    .where("hasField")
    .in(field)
    .sort({ created: -1 })
    .skip(list * count)
    .limit(count)
    .select("fileUrl title description like likeCount views")
    .populate({ path: "author", select: "userId imageUrl" });

  return pieces;
};

const allSearchByLike = async (list, count) => {
  const pieces = await Piece.find()
    .sort({ likeCount: -1, created: -1 })
    .skip(list * count)
    .limit(count)
    .select("fileUrl title description like likeCount views")
    .populate({ path: "author", select: "userId imageUrl" });

  return pieces;
};
const allFieldSearchByLike = async (field, list, count) => {
  const pieces = await Piece.find()
    .where("hasField")
    .in(field)
    .sort({ likeCount: -1, created: -1 })
    .skip(list * count)
    .limit(count)
    .select("fileUrl title description like likeCount views")
    .populate({ path: "author", select: "userId imageUrl" });

  return pieces;
};
const allSearchByView = async (list, count) => {
  const pieces = await Piece.find()
    .sort({ views: -1, created: -1 })
    .skip(list * count)
    .limit(count)
    .select("fileUrl title description like likeCount views")
    .populate({ path: "author", select: "userId imageUrl" });

  return pieces;
};

const allFieldSearchByView = async (field, list, count) => {
  const pieces = await Piece.find()
    .where("hasField")
    .in(field)
    .sort({ views: -1, created: -1 })
    .skip(list * count)
    .limit(count)
    .select("fileUrl title description like likeCount views")
    .populate({ path: "author", select: "userId imageUrl" });

  return pieces;
};

export const AllSearch = {
  allSearch,
  allSearchByLike,
  allSearchByView,
  allFieldSearch,
  allFieldSearchByLike,
  allFieldSearchByView,
};

const search = async (list, count, searchingBy) => {
  const pieces = await Piece.find({
    title: { $regex: searchingBy, $options: "i" },
  })
    .sort({ created: -1 })
    .skip(list * count)
    .limit(count)
    .select("fileUrl title description like likeCount views")
    .populate({ path: "author", select: "userId imageUrl" });
  return pieces;
};

const fieldSearch = async (field, list, count, searchingBy) => {
  const pieces = await Piece.find({
    title: { $regex: searchingBy, $options: "i" },
  })
    .where("hasField")
    .in(field)
    .sort({ created: -1 })
    .skip(list * count)
    .limit(count)
    .select("fileUrl title description like likeCount views")
    .populate({ path: "author", select: "userId imageUrl" });
  return pieces;
};

const searchByLike = async (list, count, searchingBy) => {
  const pieces = await Piece.find({
    title: { $regex: searchingBy, $options: "i" },
  })
    .sort({ likeCount: -1, created: -1 })
    .skip(list * count)
    .limit(count)
    .select("fileUrl title description like likeCount views")
    .populate({ path: "author", select: "userId imageUrl" });
  return pieces;
};

const searchByView = async (list, count, searchingBy) => {
  const pieces = await Piece.find({
    title: { $regex: searchingBy, $options: "i" },
  })
    .sort({ views: -1, created: -1 })
    .skip(list * count)
    .limit(count)
    .select("fileUrl title description like likeCount views")
    .populate({ path: "author", select: "userId imageUrl" });
  return pieces;
};
const fieldSearchByLike = async (field, list, count, searchingBy) => {
  const pieces = await Piece.find({
    title: { $regex: searchingBy, $options: "i" },
  })
    .where("hasField")
    .in(field)
    .sort({ likeCount: -1, created: -1 })
    .skip(list * count)
    .limit(count)
    .select("fileUrl title description like likeCount views")
    .populate({ path: "author", select: "userId imageUrl" });
  return pieces;
};
const fieldSearchByView = async (field, list, count, searchingBy) => {
  const pieces = await Piece.find({
    title: { $regex: searchingBy, $options: "i" },
  })
    .where("hasField")
    .in(field)
    .sort({ views: -1, created: -1 })
    .skip(list * count)
    .limit(count)
    .select("fileUrl title description like likeCount views")
    .populate({ path: "author", select: "userId imageUrl" });
  return pieces;
};
export const Searching = {
  search,
  fieldSearch,
  searchByLike,
  searchByView,
  fieldSearchByLike,
  fieldSearchByView,
};
