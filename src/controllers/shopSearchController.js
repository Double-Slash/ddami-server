import Product from "../models/Product";

const allSearch = async (list, count) => {
  const product = await Product.find()
    .sort({ created: -1 })
    .skip(list * count)
    .limit(count)
    .select("pieces title likeCount price state like locationName views")
    .populate({ path: "pieces", select: "fileUrl" });

  return product;
};

const allFieldSearch = async (field, list, count) => {
  const product = await Product.find()
    .where("hasField")
    .in(field)
    .sort({ created: -1 })
    .skip(list * count)
    .limit(count)
    .select("pieces title likeCount price state like locationName views")
    .populate({ path: "pieces", select: "fileUrl" });

  return product;
};

const allSearchByLike = async (list, count) => {
  const product = await Product.find()
    .sort({ likeCount: -1, created: -1 })
    .skip(list * count)
    .limit(count)
    .select("pieces title likeCount price state like locationName views")
    .populate({ path: "pieces", select: "fileUrl" });

  return product;
};
const allFieldSearchByLike = async (list, count) => {
  const product = await Product.find()
    .where("hasField")
    .in(field)
    .sort({ likeCount: -1, created: -1 })
    .skip(list * count)
    .limit(count)
    .select("pieces title likeCount price state like locationName views")
    .populate({ path: "pieces", select: "fileUrl" });

  return product;
};
const allSearchByDistance = async (list, count) => {
  const product = await Product.find()
    .sort({ views: -1, created: -1 })
    .skip(list * count)
    .limit(count)
    .select("pieces title likeCount price state like locationName views")
    .populate({ path: "pieces", select: "fileUrl" });

  return product;
};

const allFieldSearchByDistance = async (field, list, count) => {
  const product = await Product.find()
    .where("hasField")
    .in(field)
    .sort({ views: -1, created: -1 })
    .skip(list * count)
    .limit(count)
    .select("pieces title likeCount price state like locationName views")
    .populate({ path: "pieces", select: "fileUrl" });

  return product;
};

export const AllSearch = {
  allSearch,
  allSearchByLike,
  allSearchByDistance,
  allFieldSearch,
  allFieldSearchByLike,
  allFieldSearchByDistance,
};

const search = async (list, count, searchingBy) => {
  const product = await Product.find({
    title: { $regex: searchingBy, $options: "i" },
  })
    .sort({ created: -1 })
    .skip(list * count)
    .limit(count)
    .select("pieces title likeCount price state like locationName views")
    .populate({ path: "pieces", select: "fileUrl" });
  return product;
};

const fieldSearch = async (field, list, count, searchingBy) => {
  const product = await Product.find({
    title: { $regex: searchingBy, $options: "i" },
  })
    .where("hasField")
    .in(field)
    .sort({ created: -1 })
    .skip(list * count)
    .limit(count)
    .select("pieces title likeCount price state like locationName views")
    .populate({ path: "pieces", select: "fileUrl" });
  return product;
};

const searchByLike = async (list, count, searchingBy) => {
  const product = await Product.find({
    title: { $regex: searchingBy, $options: "i" },
  })
    .sort({ likeCount: -1, created: -1 })
    .skip(list * count)
    .limit(count)
    .select("pieces title likeCount price state like locationName views")
    .populate({ path: "pieces", select: "fileUrl" });
  return product;
};

const searchByDistance = async (list, count, searchingBy) => {
  const product = await Product.find({
    title: { $regex: searchingBy, $options: "i" },
  })
    .sort({ views: -1, created: -1 })
    .skip(list * count)
    .limit(count)
    .select("pieces title likeCount price state like locationName views")
    .populate({ path: "pieces", select: "fileUrl" });
  return product;
};
const fieldSearchByLike = async (field, list, count, searchingBy) => {
  const product = await Product.find({
    title: { $regex: searchingBy, $options: "i" },
  })
    .where("hasField")
    .in(field)
    .sort({ likeCount: -1, created: -1 })
    .skip(list * count)
    .limit(count)
    .select("pieces title likeCount price state like locationName views")
    .populate({ path: "pieces", select: "fileUrl" });
  return product;
};
const fieldSearchByDistance = async (field, list, count, searchingBy) => {
  const product = await Product.find({
    title: { $regex: searchingBy, $options: "i" },
  })
    .where("hasField")
    .in(field)
    .sort({ views: -1, created: -1 })
    .skip(list * count)
    .limit(count)
    .select("pieces title likeCount price state like locationName views")
    .populate({ path: "pieces", select: "fileUrl" });
  return product;
};
export const Searching = {
  search,
  fieldSearch,
  searchByLike,
  searchByDistance,
  fieldSearchByLike,
  fieldSearchByDistance,
};
