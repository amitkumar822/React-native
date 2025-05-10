import Product from "../models/product.model.js";

export const getProductsByCategoryId = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const products = await Product.find({ category: categoryId });

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No Products found for this category",
      });
    }

    res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve product",
      error: err.message,
    });
  }
};
