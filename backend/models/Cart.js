import mongoose from 'mongoose';

const Schema = mongoose.Schema

const cartSchema = new Schema({
  userId:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  items:[
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      variantId: { type: mongoose.Schema.Types.ObjectId, ref: "Variant" },
      quantity: Number,
      price: Number,
    }
  ],
  coupon:{
    code:String,
    discountAmount:Number
  },
  totals:{
    subtotal:Number,
    tax:Number,
    shipping:Number,
    discount:Number,
    grandTotal:Number
  }
},{ timestamps: true })

const Cart = mongoose.model("Cart",cartSchema);

export default Cart;
