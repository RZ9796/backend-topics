import mongoose, { Document } from "mongoose";

export interface Payment_info extends Document {
  customerName: string;
  productName: string;
  amount: number;
  paymentStatus: string;
}

const PaymentSchema = new mongoose.Schema<Payment_info>(
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

    paymentStatus: {
      type: String,
      default: "Unpaid",
    },
  },
  { timestamps: true }
);

const PaymentModel = mongoose.model<Payment_info>(
  "payment_status",
  PaymentSchema
);

export default { PaymentModel };
