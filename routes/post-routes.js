import express from "express";
import {
  // getAllPosts,
  // getPost,
  createPost,
  publishPost,
  editPost,
  removePost,
} from "../controllers/post-controller.js";
import { authenticateJWT } from "../middleware/auth.js";

const router = express.Router();

// router.get("/", getAllPosts);
// router.get("/:id", getPost);
router.post("/", createPost);
router.patch("/:id", publishPost);
router.put("/:id", editPost);
router.delete("/:id", removePost);

export const postRoutes = router;
