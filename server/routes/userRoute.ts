import express from "express";
import {
  checkAuth,
  forgotPassword,
  login,
  logOut,
  resetPassword,
  signUp,
  updateProfile,
  verifyEmail,
} from "../controllers/userController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.route("/check-auth").get(isAuthenticated as any, checkAuth as any);
router.route("/signup").post(signUp as any);
router.route("/login").post(login as any);
router.route("/logout").post(logOut as any);
router.route("/verify-email").post(verifyEmail as any);
router.route("/forgot-password").post(forgotPassword as any);
router.route("/reset-password/:token").post(resetPassword as any);
router.route("/profile/update").put(isAuthenticated as any, updateProfile as any);

export default router;
