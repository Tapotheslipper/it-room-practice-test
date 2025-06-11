import express from "express";
import {
  getAllPosts,
  getPost,
  createPost,
  publishPost,
  editPost,
  removePost,
} from "../controllers/post-controller.js";
import { authenticateJWT } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getAllPosts);
router.get("/:id", getPost);
router.post("/", authenticateJWT, createPost);
router.patch("/:id", authenticateJWT, publishPost);
router.put("/:id", authenticateJWT, editPost);
router.delete("/:id", authenticateJWT, removePost);

export const postRoutes = router;
