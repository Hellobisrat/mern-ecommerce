import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  name: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  country: String,
  postalCode: String,
  isDefault: { type: Boolean, default: false }
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  phone: String,
  avatar: String,

  role: { type: String, enum: ["customer", "admin"], default: "customer" },

  addresses: [AddressSchema],

  wishlist: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Product" }
  ],

  isVerified: { type: Boolean, default: false },

}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;