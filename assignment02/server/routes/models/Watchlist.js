import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      titleId: { type: mongoose.Schema.Types.ObjectId, ref: "Title", required: true },
      addedAt: { type: Date, default: Date.now }
    }
  ]
}, { timestamps: true });

export default mongoose.model("Watchlist", watchlistSchema);
