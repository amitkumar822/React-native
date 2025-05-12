import {config} from "dotenv";
config();
import mongoose, {Types} from "mongoose";
import Product from "./src/models/product.model.js";
import Category from "./src/models/category.model.js";
import { categoriesData, productData } from "./seedData.js";


async function seedDatabase() {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`);
        
        await Category.deleteMany({});
        await Product.deleteMany({});

        const categories = await Category.insertMany(categoriesData);

        const categoryMap = categories.reduce((acc, category) => {
            acc[category.name] = category._id;
            return acc;
        }, {});

        const productsWithCategoryIds = productData.map((product) => {
            return {
                ...product,
                category: categoryMap[product.category],
            };
        });

        await Product.insertMany(productsWithCategoryIds);
        
        console.log("Connected to MongoDB Successfully");
    } catch (error) {
        console.log("Error seeding database:", error);
        
    } finally {
        mongoose.connection.close();
    }
}
 seedDatabase()