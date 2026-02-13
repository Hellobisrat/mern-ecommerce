

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    description: { type: String, default: "" },
    image: { type: String, default: null },

    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null
    },

    isActive: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Category", CategorySchema);