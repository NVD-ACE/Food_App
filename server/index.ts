import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./database/connectDatabase";

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoute from "./routes/userRoute";
import menuRoute from "./routes/menuRoute";
import restaurantRoute from "./routes/restaurantRoute";
import path from "path";
import orderRoute from "./routes/orderRoute";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

const DIRNAME = path.resolve();

// default middlewares for any mern project
app.use(
  bodyParser.json({
    limit: "10mb",
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "10mb",
  })
);
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: "https://food_app_nvd.onrender.com",
  credentials: true,
};

app.use(cors(corsOptions));
// api routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/restaurants", restaurantRoute);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);

app.use(express.static(path.join(DIRNAME, "/client/dist")));
app.use("*", (_, res) => {
  res.sendFile(path.resolve(DIRNAME, "client", "dist", "index.html"));
});
app.listen(port, () => {
  connectDatabase();
  console.log(`Server is running on port ${port}`);
});
