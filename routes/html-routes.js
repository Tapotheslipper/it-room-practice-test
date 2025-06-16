import express from "express";
import { getHomePage, getPostsPage } from "../controllers/html-controller.js";

const router = express.Router();

router.get("/", getHomePage);
router.get("/posts", getPostsPage);

export const htmlRoutes = router;
