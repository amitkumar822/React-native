import express from "express";
import { createOrder, createTransaction, getOrderByUserId } from "../controllers/order.controller.js";

const router = express.Router();

// transaction route
router.post("/transaction", createTransaction)

// order
router.get("/:userId", getOrderByUserId)
router.post("/", createOrder)

export default router;
