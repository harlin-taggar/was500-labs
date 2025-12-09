import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";

export default function Details() {
  const { id } = useParams();

  const [anime, setAnime] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const loggedInEmail = localStorage.getItem("email");

  useEffect(() => {
    const load = async () => {
      const res = await api.get(`/titles/${id}`);
      setAnime(res.data);

      const rev = await api.get(`/reviews/${id}`);
      setReviews(rev.data);
    };
    load();
  }, [id]);

  // SUBMIT review
  const submit = async () => {
    if (!token) {
      alert("Login required to submit review.");
      return;
    }

    try {
      await api.post(
        "/reviews",
        { rating, text, titleId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const rev = await api.get(`/reviews/${id}`);
      setReviews(rev.data);

      setText("");
      setRating(0);
    } catch (err) {
      setError("Failed to submit review.");
    }
  };

  // DELETE review
  const deleteReview = async (reviewId) => {
    try {
      await api.delete(`/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const rev = await api.get(`/reviews/${id}`);
      setReviews(rev.data);
    } catch (err) {
      alert("Not allowed.");
    }
  };

  // DATE FORMAT helper
  const formatDate = (d) =>
    new Date(d).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  if (!anime) return <h2>Loading...</h2>;

  return (
    <div className="container">

      {/* Anime SECTION */}
      <div className="details-top">
        <img
          src={`http://localhost:5000${anime.poster}`}
          className="details-poster"
          alt={anime.name}
        />

        <div className="details-info">
          <h1>{anime.name}</h1>
          <p>{anime.synopsis}</p>
          <p><b>Year:</b> {anime.year}</p>
          <p><b>Genres:</b> {anime.genres.join(", ")}</p>
        </div>
      </div>

      {/* REVIEWS */}
      <h2 style={{ marginTop: "40px" }}>Reviews</h2>

      {reviews.length === 0 && <p>No reviews yet.</p>}

      {reviews.map((r) => (
        <div key={r._id} className="review-card">
          <b>Rating:</b>
          {"⭐".repeat(r.rating)}
          <span> ({r.rating}/5)</span>
          <br />

          {r.text}
          <br />

          <small>
            Review by <b>{r.userEmail || "Unknown"}</b>
          </small>
          <br />

          <small>
            Posted on {formatDate(r.createdAt)}
            {r.updatedAt && r.updatedAt !== r.createdAt && (
              <span style={{ marginLeft: "6px", color: "#888" }}>(updated)</span>
            )}
          </small>

          {(loggedInEmail === r.userEmail ||
            loggedInEmail === "developer@myseneca.ca") && (
            <button onClick={() => deleteReview(r._id)} className="delete-btn">
              Delete
            </button>
          )}
        </div>
      ))}

      {/* REVIEW FORM (logged-in users only) */}
      {token && (
        <div className="card form-card">
          <h3>Add or Update Your Review</h3>

          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* Star rating */}
          <div className="stars">
            {[1, 2, 3, 4, 5].map((num) => (
              <span
                key={num}
                className={num <= rating ? "star active" : "star"}
                onClick={() => setRating(num)}
              >
                ★
              </span>
            ))}
            <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
              ({rating}/5)
            </span>
          </div>

          <textarea
            placeholder="Write your review..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          <button onClick={submit}>Submit Review</button>
        </div>
      )}

      {!token && <p>Login to write a review.</p>}
    </div>
  );
}
