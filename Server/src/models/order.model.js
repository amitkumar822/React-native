import mongoose, { Schema } from "mongoose";

const itemScheam = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deliveryDate: {
      type: Date,
      requied: true,
      // default: new Date(),
    },
    address: {
      type: String,
    },
    items: {
      type: [itemScheam],
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Order Placed",
        "Shipping",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Order Placed",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
