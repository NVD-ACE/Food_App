import mongoose from "mongoose";

type DeliveryDetails = {
  email: string;
  name: string;
  address: string;
  city: string;
};
type CartItems = {
  menuId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};
export interface IOrder extends mongoose.Document {
  user: mongoose.Schema.Types.ObjectId;
  restaurant: mongoose.Schema.Types.ObjectId;
  deliveryDetails: DeliveryDetails;
  cartItems: CartItems[];
  totalAmount: number;
  status:
    | "pending"
    | "completed"
    | "cancelled"
    | "processing"
    | "perparing"
    | "delivered"
    | "confirmed"
    | "outfordelivery";
}
const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    deliveryDetails: {
      email: { type: String, required: true },
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
    },
    cartItems: [
      {
        // menuId: {
        //   type: mongoose.Schema.Types.ObjectId,
        //   ref: "Menu",
        //   required: true,
        // },
        menuId: {
          type: String,
          required: true,
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: [
        "pending",
        "completed",
        "cancelled",
        "processing",
        "perparing",
        "delivered",
        "confirmed",
        "outfordelivery",
      ],
    },
  },
  { timestamps: true }
);
export const Order = mongoose.model("Order", orderSchema);
