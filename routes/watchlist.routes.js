// server/routes/watchlist.routes.js
import express from "express";
import auth from "../middleware/auth.js";
import User from "../models/User.js";
import Title from "../models/Title.js";

const router = express.Router();

/**
 * WATCHLIST STORED INSIDE USER DOCUMENT:
 * user.watchlist = [ObjectId, ObjectId, ...]
 */

// Get logged-in user's watchlist
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("watchlist");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.watchlist);
  } catch (err) {
    console.error("GET WATCHLIST ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Add a title to watchlist
router.post("/add", auth, async (req, res) => {
  try {
    const { titleId } = req.body;

    if (!titleId) {
      return res.status(400).json({ message: "titleId required" });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare ObjectId properly
    const alreadyAdded = user.watchlist.some(
      (item) => item.toString() === titleId.toString()
    );

    if (alreadyAdded) {
      return res.status(409).json({ message: "Already in watchlist" });
    }

    user.watchlist.push(titleId);
    await user.save();

    res.json({ message: "Added successfully" });
  } catch (err) {
    console.error("ADD WATCHLIST ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Remove a title from watchlist
router.delete("/remove/:id", auth, async (req, res) => {
  try {
    const { id } = req.params; // titleId

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.watchlist = user.watchlist.filter(
      (item) => item.toString() !== id.toString()
    );

    await user.save();

    res.json({ message: "Removed successfully" });
  } catch (err) {
    console.error("REMOVE WATCHLIST ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
