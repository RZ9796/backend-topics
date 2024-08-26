import mongoose, { Document } from "mongoose";

export interface Order_Info extends Document {
  customerName: string;
  productName: string;
  amount: number;
}

const orderSchema = new mongoose.Schema<Order_Info>(
  {
    customerName: {
      type: String,
      required: true,
    },

    productName: {
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
