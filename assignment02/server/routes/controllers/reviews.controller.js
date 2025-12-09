import Review from "../models/Review.js";
import User from "../models/User.js";

// =========================================================
// GET all reviews for a title
// =========================================================
export const getReviewsForTitle = async (req, res) => {
  try {
    const reviews = await Review.find({ titleId: req.params.id })
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    console.error("GET REVIEW ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// =========================================================
// ADD or UPDATE review
// =========================================================
export const addOrUpdateReview = async (req, res) => {
  try {
    const { rating, text, titleId } = req.body;

    if (!rating || !text) {
      return res
        .status(400)
        .json({ message: "Rating and text are required." });
    }

    // Get logged-in user
    const user = await User.findById(req.user.id);
    if (!user) return res.status(400).json({ message: "User not found" });

    const userEmail = user.email;
    const userId = req.user.id;

    // Enforce max 5 stars
    const finalRating = Math.min(Number(rating), 5);

    // Check if user already reviewed this title
    let review = await Review.findOne({ userId, titleId });

    if (review) {
      // Update existing review
      review.rating = finalRating;
      review.text = text;
      review.userEmail = userEmail;
      await review.save();
    } else {
      // Create new review
      review = await Review.create({
        rating: finalRating,
        text,
        userId,
        userEmail,
        titleId,
      });
    }

    res.json(review);
  } catch (err) {
    console.error("CREATE REVIEW ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// =========================================================
// DELETE review (owner or admin)
// =========================================================
export const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;   // ← FIXED PARAM

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Logged-in user
    const user = await User.findById(req.user.id);
    if (!user) return res.status(400).json({ message: "User not found" });

    const loggedEmail = user.email;

    // Permission checks
    const isOwner = loggedEmail === review.userEmail;
    const isAdmin = loggedEmail === "developer@myseneca.ca";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await Review.findByIdAndDelete(reviewId);

    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error("DELETE REVIEW ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
