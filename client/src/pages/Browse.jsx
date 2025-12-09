// client/src/pages/Browse.jsx
import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Browse() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await api.get("/titles");
    setList(res.data);
  };

  const filtered = list.filter(anime =>
    anime.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h2 className="details-title">Browse Anime</h2>

      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "20px" }}
      />

      <div className="grid">
        {filtered.map(anime => (
          <Link key={anime._id} to={`/details/${anime._id}`}>
            <div className="grid-item">
              <img
                src={`http://localhost:5000${anime.poster}`}
                className="poster-img"
                alt={anime.name}
              />
              <h3>{anime.name}</h3>
              <p>{anime.year}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
