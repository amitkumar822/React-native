import AdminJs from "adminjs";
import AdminJsExpress from "@adminjs/express";
import session from "express-session";
import ConnectMongoDBSession from "connect-mongodb-session";
import Product from "../src/models/product.model.js";
import Category from "../src/models/category.model.js";
import Order from "../src/models/order.model.js";
import User from "../src/models/user.model.js";
import Transaction from "../src/models/transaction.model.js";
import * as AdminJSMongoose from "@adminjs/mongoose";
import { COOKIE_PASSWORD } from "./config.js";
import { dark, light, noSidebar } from "@adminjs/themes";

AdminJs.registerAdapter(AdminJSMongoose);

const DEFAULT_ADMIN = {
  email: "admin@gmail.com",
  password: "12345678",
};

const authenticate = async (email, password) => {
  console.log("email", email);
  console.log("password", password);

  // Check if the email and password match the default admin credentials

  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

export const buildAdminJS = async (app) => {
  const admin = new AdminJs({
    resources: [
      { resource: Product },
      { resource: Category },
      { resource: Order },
      { resource: User },
      { resource: Transaction },
    ],
    branding: {
      companyName: "AmiShop",
      withMadeWithLove: false,
      favicon: "",
      logo: "",
      // favicon: "https://i.postimg.cc/ZRCCXLgg/temp-Imagef—Coi-ZY.avif",
      // logo: "https://i.postimg.cc/ZRCCXLgg/temp-Imagef—Coi-ZY.avif"
    },
    defaultTheme: dark.id,
    availableThemes: [dark, light, noSidebar],
    rootPath: "/admin",
  });

  const MongoDBStore = ConnectMongoDBSession(session);
  const sessionStore = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: "sessions",
  });

  const adminRouter = AdminJsExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: "adminjs",
      cookiePassword: COOKIE_PASSWORD,
    },
    null,
    {
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      secret: COOKIE_PASSWORD,
      cookie: {
        httpOnly: process.env.NODE_ENV === "production",
        secure: process.env.NODE_ENV === "production",
      },
      name: "adminjs",
    }
  );

  app.use(admin.options.rootPath, adminRouter);
};
