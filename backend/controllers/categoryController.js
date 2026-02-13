import Category from "../models/Category.js";
import slugify from "slugify";

export const createCategory = async (req, res) => {
  try {
    const { name, description, image, parentId } = req.body;

    const category = await Category.create({
      name,
      slug: slugify(name, { lower: true }),
      description,
      image,
      parentId: parentId || null
    });

    res.status(201).json({ success: true, category });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ sortOrder: 1 });
    res.status(200).json({ success: true, categories });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    res.status(200).json({ success: true, category });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { name, description, image, parentId } = req.body;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name,
        slug: slugify(name, { lower: true }),
        description,
        image,
        parentId: parentId || null
      },
      { new: true }
    );

    res.status(200).json({ success: true, category });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }

    return res.status(200).json({ success: true, message: "Category deleted" });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};