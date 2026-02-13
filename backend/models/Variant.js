import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const VariantSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  attributes: {
    color: String,
    size: String
  },
  price: Number,
  stock: Number,
  sku: String,
  images: [String]
}, { timestamps: true });

const Variant = mongoose.model("Variant", VariantSchema);

export default Variant