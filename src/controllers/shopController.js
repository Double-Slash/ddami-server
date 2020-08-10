import Product from "../models/Product";
import User from "../models/User";
import Piece from "../models/Piece";
import { converter } from "../university";

export const uploadPiece = async (req, res) => {
  const {
    body: { pieces, title, price, description, hasField, locationName },
  } = req; // pieces는 id 배열
  const user = await User.findById(req.decoded._Id);
  try {
    const product = await Product({
      pieces,
      title,
      price,
      description,
      author: req.decoded._id,
      hasField,
      locationName,
      location: converter(locationName),
    });
    const madeProduct = await Product.create(product);
    await Piece.findByIdAndUpdate(madeProduct._id, { state: 1 }, (err) => {
      if (err) {
        console.log(err);
        return;
      }
    });
    res.json({
      result: 1,
      message: "성공적으로 따미 작품샾에 업로드 하였습니다.",
    });
  } catch (err) {
    console.log(err);
    res.json({ result: 0, message: "DB 오류" });
  }
};
