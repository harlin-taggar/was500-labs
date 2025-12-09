export default function Profile() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
    return null;
  }

  return (
    <div className="container">
      <div className="card" style={{ textAlign: "center" }}>
        <h2 className="details-title">My Profile</h2>

        <button
          style={{ marginTop: "20px" }}
          onClick={() => (window.location.href = "/watchlist")}
        >
          View Watchlist
        </button>
      </div>
    </div>
  );
}
