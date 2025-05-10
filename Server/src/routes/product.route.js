import express from "express";
import { getProductsByCategoryId } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/:categoryId", getProductsByCategoryId)

export default router;
