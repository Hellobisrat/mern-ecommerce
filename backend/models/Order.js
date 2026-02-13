
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        variantId: { type: Schema.Types.ObjectId, ref: "Variant" },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        fulfillmentStatus: { type: String, default: "pending" }
      }
    ],

    shippingAddress: {
      name: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      country: String,
      postalCode: String
    },

    payment: {
      method: String,
      trackingNumber: String,
      carrier: String
    },

    status: { type: String, default: "pending" },

    totals: {
      subtotal: Number,
      tax: Number,
      shipping: Number,
      discount: Number,
      grandTotal: Number
    },

    history: [
      {
        status: String,
        date: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);