import Category from "../models/category.model.js";

export const getAllCategories = async (_, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      success: true,
      categories,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve categories",
      error: err.message,
    });
  }
};
