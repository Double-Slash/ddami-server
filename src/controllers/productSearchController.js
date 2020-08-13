import Product from "../models/Product";

const allSearch = async (list, count) => {
  const product = await Product.find()
    .sort({ created: -1 })
    .skip(list * count)
    .limit(count)
    .select(
      "pieces title likeCount price hasField views likeCount state like locationName views"
    )
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
    .select(
      "pieces title likeCount price hasField views likeCount state like locationName views"
    )
    .populate({ path: "pieces", select: "fileUrl" });

  return product;
};

const allSearchByLike = async (list, count) => {
  const product = await Product.find()
    .sort({ likeCount: -1, created: -1 })
    .skip(list * count)
    .limit(count)
    .select(
      "pieces title likeCount price hasField views likeCount state like locationName views"
    )
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
    .select(
      "pieces title likeCount price hasField views likeCount state like locationName views"
    )
    .populate({ path: "pieces", select: "fileUrl" });

  return product;
};
const allSearchByDistance = async (list, count, location) => {
  console.log("거리순");
  const product = await Product.aggregate([
    {
      $geoNear: {
        spherical: true,
        maxDistance: 500000,
        near: {
          type: "Point",
          coordinates: location,
        },
        distanceField: "distance",
        key: "location",
      },
    },
    { $skip: list * count },
    { $limit: count },
  ]);
  return product;
};

const allFieldSearchByDistance = async (field, list, count, location) => {
  const product = await Product.aggregate([
    {
      $geoNear: {
        spherical: true,
        maxDistance: 500000,
        near: {
          type: "Point",
          coordinates: location,
        },
        distanceField: "distance",
        key: "location",
      },
    },
    { $skip: list * count },
    { $limit: count },
  ]);

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
    .select(
      "pieces title likeCount price hasField views likeCount state like locationName views"
    )
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
    .select(
      "pieces title likeCount price hasField views likeCount state like locationName views"
    )
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
    .select(
      "pieces title likeCount price hasField views likeCount state like locationName views"
    )
    .populate({ path: "pieces", select: "fileUrl" });
  return product;
};

const searchByDistance = async (list, count, searchingBy, location) => {
  const product = await Product.aggregate([
    {
      $geoNear: {
        spherical: true,
        maxDistance: 500000,
        near: {
          type: "Point",
          coordinates: location,
        },
        distanceField: "distance",
        key: "location",
        query: { title: { $regex: searchingBy, $options: "i" } },
      },
    },
    { $skip: list * count },
    { $limit: count },
  ]);
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
    .select(
      "pieces title likeCount price hasField views likeCount state like locationName views"
    )
    .populate({ path: "pieces", select: "fileUrl" });
  return product;
};
const fieldSearchByDistance = async (
  field,
  list,
  count,
  searchingBy,
  location
) => {
  const product = await Product.aggregate([
    {
      $geoNear: {
        spherical: true,
        maxDistance: 500000,
        near: {
          type: "Point",
          coordinates: location,
        },
        distanceField: "distance",
        key: "location",
        query: { title: { $regex: searchingBy, $options: "i" } },
      },
    },
    { $skip: list * count },
    { $limit: count },
  ]);

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
