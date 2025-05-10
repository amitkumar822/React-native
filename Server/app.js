import express from "express";
import {config} from "dotenv";
config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Routes import
import userRoutes from "./src/routes/user.route.js";
import categoryRoutes from "./src/routes/category.route.js";
import orderRoutes from "./src/routes/order.route.js";
import productRoutes from "./src/routes/product.route.js";
import { connectDB } from "./config/connect.js";
import { PORT } from "./config/config.js";
import { buildAdminJS } from "./config/setup.js";

// Routes
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/order", orderRoutes);
app.use("/product", productRoutes);


const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);

    await buildAdminJS(app);

    app.listen({ port: PORT, host: "0.0.0.0" }, (err, addr) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`Admin Server started on http://localhost:${PORT}/admin`);
        console.log(`Server started on http://localhost:${PORT}`);
      }
    });
  } catch (error) {
    console.log("Error Starting Server -> ", error);
  }
};

start();
