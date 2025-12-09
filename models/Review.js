import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, required: true },

    // Character / anime being reviewed
    titleId: { type: mongoose.Schema.Types.ObjectId, ref: "Title", required: true },

    // User who wrote the review
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Display email
    userEmail: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Review", ReviewSchema);
