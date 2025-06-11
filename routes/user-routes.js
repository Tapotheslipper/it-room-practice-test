import express from "express";
import {
  registerUser,
  activateUser,
  authenticateUser,
  getAllUsers,
  getUser,
} from "../controllers/user-controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/reg", registerUser);
router.post("/activate", activateUser);
router.post("/auth", authenticateUser);

export const userRoutes = router;
