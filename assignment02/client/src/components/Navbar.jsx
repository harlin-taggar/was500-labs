import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";

export default function Navbar() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (token && email) {
      setUserEmail(email);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setUserEmail(null);
    navigate("/login");
  };

  return (
    <nav>
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Home
      </NavLink>

      <NavLink to="/browse" className={({ isActive }) => (isActive ? "active" : "")}>
        Browse
      </NavLink>

      {!userEmail && (
        <>
          <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
            Login
          </NavLink>

          <NavLink to="/register" className={({ isActive }) => (isActive ? "active" : "")}>
            Register
          </NavLink>
        </>
      )}

      {userEmail && (
        <>
          <NavLink to="/watchlist" className={({ isActive }) => (isActive ? "active" : "")}>
            Watchlist
          </NavLink>

          <span
            style={{
              marginLeft: "20px",
              fontWeight: "600",
              color: "#6b21a8",
              fontSize: "14px"
            }}
          >
            Logged in as: {userEmail}
          </span>

          <button
            onClick={logout}
            style={{
              marginLeft: "20px",
              padding: "6px 12px",
              borderRadius: "8px",
              border: "none",
              background: "#ec4899",
              color: "white",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
}
