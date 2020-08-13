import Material from "../models/Material";

const allSearch = async (list, count) => {
  const material = await Material.find()
    .sort({ created: -1 })
    .skip(list * count)
    .limit(count)
    .select(
      "fileUrl title likeCount price hasField views likeCount state like locationName views"
    );

  return material;
};

const allFieldSearch = async (field, list, count) => {
  const material = await Material.find()
    .where("hasField")
    .in(field)
    .sort({ created: -1 })
    .skip(list * count)
    .limit(count)
    .select(
      "fileUrl title likeCount price hasField views likeCount state like locationName views"
    );

  return material;
};

const allSearchByLike = async (list, count) => {
  const material = await Material.find()
    .sort({ likeCount: -1, created: -1 })
    .skip(list * count)
    .limit(count)
    .select(
      "fileUrl title likeCount price hasField views likeCount state like locationName views"
    );

  return material;
};
const allFieldSearchByLike = async (list, count) => {
  const material = await Material.find()
    .where("hasField")
    .in(field)
    .sort({ likeCount: -1, created: -1 })
    .skip(list * count)
    .limit(count)
    .select(
      "fileUrl title likeCount price hasField views likeCount state like locationName views"
    );

  return material;
};
const allSearchByDistance = async (list, count, location) => {
  console.log("거리순");
  const material = await Material.aggregate([
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
  return material;
};

const allFieldSearchByDistance = async (field, list, count, location) => {
  const material = await Material.aggregate([
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

  return material;
};

export const AllSearch2 = {
  allSearch,
  allSearchByLike,
  allSearchByDistance,
  allFieldSearch,
  allFieldSearchByLike,
  allFieldSearchByDistance,
};

const search = async (list, count, searchingBy) => {
  const material = await Material.find({
    title: { $regex: searchingBy, $options: "i" },
  })
    .sort({ created: -1 })
    .skip(list * count)
    .limit(count)
    .select(
      "fileUrl title likeCount price hasField views likeCount state like locationName views"
    );
  return material;
};

const fieldSearch = async (field, list, count, searchingBy) => {
  const material = await Material.find({
    title: { $regex: searchingBy, $options: "i" },
  })
    .where("hasField")
    .in(field)
    .sort({ created: -1 })
    .skip(list * count)
    .limit(count)
    .select(
      "fileUrl title likeCount price hasField views likeCount state like locationName views"
    );
  return material;
};

const searchByLike = async (list, count, searchingBy) => {
  const material = await Material.find({
    title: { $regex: searchingBy, $options: "i" },
  })
    .sort({ likeCount: -1, created: -1 })
    .skip(list * count)
    .limit(count)
    .select(
      "fileUrl title likeCount price hasField views likeCount state like locationName views"
    );
  return material;
};

const searchByDistance = async (list, count, searchingBy, location) => {
  const material = await Material.aggregate([
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
  return material;
};
const fieldSearchByLike = async (field, list, count, searchingBy) => {
  const material = await Material.find({
    title: { $regex: searchingBy, $options: "i" },
  })
    .where("hasField")
    .in(field)
    .sort({ likeCount: -1, created: -1 })
    .skip(list * count)
    .limit(count)
    .select(
      "fileUrl title likeCount price hasField views likeCount state like locationName views"
    );
  return material;
};
const fieldSearchByDistance = async (
  field,
  list,
  count,
  searchingBy,
  location
) => {
  const material = await Material.aggregate([
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

  return material;
};
export const Searching2 = {
  search,
  fieldSearch,
  searchByLike,
  searchByDistance,
  fieldSearchByLike,
  fieldSearchByDistance,
};
