import { useState } from "react";
import api from "../api/axios";

export default function ReviewForm({ titleId, onSubmit }) {
  const [rating, setRating] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Login to submit a review");
      return;
    }

    if (!rating || !text) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await api.post(
        "/reviews",
        { rating, text, titleId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setRating("");
      setText("");
      setError("");

      onSubmit(res.data);
    } catch {
      setError("Failed to submit review.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ marginTop: "20px" }}>
      <h3>Add or Update Your Review</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="number"
        min="1"
        max="10"
        placeholder="Rating (1–10)"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />

      <textarea
        placeholder="Write your review..."
        rows="4"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>

      <button type="submit">Submit Review</button>
    </form>
  );
}
