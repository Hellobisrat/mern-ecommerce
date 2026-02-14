import Product from '../models/Product.js';


export const createProduct = async (req, res) => {
  try {
    let images = [];

    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => file.path);
    }

    const product = await Product.create({
      ...req.body,
      images
    });

    res.status(201).json({ success: true, message: "Product created", product });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    let updateData = { ...req.body };

    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((file) => file.path);
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json({ success: true, message: "Product updated", product: updated });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const { search, category, brand, minPrice, maxPrice } = req.query;

    let filter = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (category) {
      filter.categoryId = category;
    }

    if (brand) {
      filter.brand = brand;
    }

    if (minPrice || maxPrice) {
      filter.price = {
        $gte: Number(minPrice) || 0,
        $lte: Number(maxPrice) || 999999
      };
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ success: true, products });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};