import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      variantId: { type: mongoose.Schema.Types.ObjectId, ref: "Variant" },
      quantity: Number,
      price: Number,
      fulfillmentStatus: String
    }
  ],

  shipping: {
    address: {
      name: String,
      phone: String,
      address: String,
      city: String,
      state: String,
      country: String,
      postalCode: String
    }
  },

  payment: {
    method: String,
    trackingNumber: String,
    carrier: String
  },

  status: String,

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

}, { timestamps: true });

const Order = mongoose.model("Order",OrderSchema);

export default Order;