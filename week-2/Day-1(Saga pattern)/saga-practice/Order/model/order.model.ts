import mongoose, { Document } from "mongoose";

export interface Order_Info extends Document {
  Name: string;
  product: string;
  amount: number;
}

const orderSchema = new mongoose.Schema<Order_Info>(
  {
    Name: {
      type: String,
      required: true,
    },

    product: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model<Order_Info>("myorder", orderSchema);
export default { OrderModel };
