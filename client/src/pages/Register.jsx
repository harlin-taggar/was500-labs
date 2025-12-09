import { useState } from "react";
import api from "../api/axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await api.post("/auth/register", { email, password });

      localStorage.setItem("email", email);

      setSuccess("Account created successfully!");

      // Send user to login page
      setTimeout(() => {
        window.location.href = "/login";
      }, 1200);

    } catch (err) {
      setError("Email already exists.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: "400px", margin: "0 auto" }}>
        <h2 className="details-title">Register</h2>

        {error && <p style={{ color: "red", marginBottom: "12px" }}>{error}</p>}
        {success && <p style={{ color: "green", marginBottom: "12px" }}>{success}</p>}

        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
