import express from "express";
import upload from "../middlewares/multer";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { addMenu, editMenu } from "../controllers/menuController";

const router = express.Router();

router.route("/").post(isAuthenticated as any, upload.single("image"), addMenu as any);
router.route("/:id").put(isAuthenticated as any, upload.single("image"), editMenu as any);

export default router;
