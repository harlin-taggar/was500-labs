// client/src/pages/Watchlist.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Watchlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    load();
  }, []);

  const load = async () => {
    try {
      const res = await api.get("/watchlist", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setItems(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    try {
      await api.delete(`/watchlist/remove/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setItems(items.filter(x => x._id !== id));

    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <p className="container">Loading...</p>;

  return (
    <div className="container">
      <h2 className="details-title">My Watchlist</h2>

      {items.length === 0 ? (
        <p style={{ marginTop: "20px" }}>Your watchlist is empty.</p>
      ) : (
        <div className="grid">
          {items.map(anime => (
            <div key={anime._id} className="grid-item">

              <img
                src={`http://localhost:5000${anime.poster}`}
                className="poster-img"
                alt={anime.name}
              />

              <h3>{anime.name}</h3>
              <p>{anime.year}</p>

              <button
                style={{ marginTop: "10px" }}
                onClick={() => removeItem(anime._id)}
              >
                Remove
              </button>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
