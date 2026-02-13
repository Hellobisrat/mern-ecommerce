import mongoose from "mongoose";

const Schema = mongoose.Schema;

const cartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        variantId: { type: Schema.Types.ObjectId, ref: "Variant" },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true }
      }
    ],

    coupon: {
      code: String,
      discountAmount: Number
    },

    totals: {
      subtotal: Number,
      tax: Number,
      shipping: Number,
      discount: Number,
      grandTotal: Number
    }
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);