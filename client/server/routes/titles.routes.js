import express from "express";
import {
  getAllTitles,
  getTitle,
  createTitle,
  updateTitle,
  deleteTitle
} from "../controllers/titles.controller.js";

import auth from "../middleware/auth.js"; 

const router = express.Router();

// PUBLIC
router.get("/", getAllTitles);
router.get("/:id", getTitle);

// PROTECTED
router.post("/", auth, createTitle);
router.put("/:id", auth, updateTitle);
router.delete("/:id", auth, deleteTitle);

export default router;
