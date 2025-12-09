import express from "express";
import auth from "../middleware/auth.js";

import {
  getReviewsForTitle,
  addOrUpdateReview,
  deleteReview
} from "../controllers/reviews.controller.js";

const router = express.Router();

// GET all reviews for a title (titleId)
router.get("/:id", getReviewsForTitle);

// CREATE or UPDATE review
router.post("/", auth, addOrUpdateReview);

// DELETE a review (owner or admin)
router.delete("/:reviewId", auth, deleteReview);

export default router;
