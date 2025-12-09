import { useState } from "react";
import api from "../api/axios";
import "../App.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);   
      localStorage.setItem("email", email);

      // redirect after login
      window.location.href = "/profile";

    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div 
        className="card fade-in"
        style={{
          maxWidth: "420px",
          margin: "50px auto",
          padding: "32px"
        }}
      >

        <h2 className="details-title" style={{ textAlign: "center" }}>
          Login
        </h2>

        {error && (
          <p style={{ color: "red", marginBottom: "14px", textAlign: "center" }}>
            {error}
          </p>
        )}

        <form onSubmit={submit}>
          <label style={{ fontWeight: 600 }}>Email</label>
          <input
            type="email"
            placeholder="Enter email…"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label style={{ fontWeight: 600 }}>Password</label>
          <input
            type="password"
            placeholder="Enter password…"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button 
            type="submit" 
            disabled={loading}
            style={{ width: "100%", marginTop: "10px" }}
          >
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>

      </div>
    </div>
  );
}
