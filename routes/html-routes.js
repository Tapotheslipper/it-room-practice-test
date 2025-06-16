import express from "express";
import {
  getHomePage,
  getPostsPage,
  getAuthPage,
} from "../controllers/html-controller.js";

const router = express.Router();

router.get("/", getHomePage);
router.get("/posts", getPostsPage);
router.get("/auth", getAuthPage);

export const htmlRoutes = router;
