import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image_uri: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    ar_uri: {
      type: String,
    },
    description: {
      type: String,
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  { timestamps: true }
);
const Product = mongoose.model("Product", productSchema);
export default Product;
