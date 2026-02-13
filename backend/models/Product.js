import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name:{ type:String, required: true},
  slug:{type:String,unique:true},
  description:String,
  images:[String],
  price:{ type: Number, required: true, min: 0 },
  discountPrice:Number,
  sku:String,
  categoryId:{
  type: mongoose.Schema.Types.ObjectId,
  ref: "Category"
}
,
  brand:String
 
},{ timestamps: true }
)

const Product= mongoose.model("Product",productSchema);

export default Product;