import { useState } from "react";
import api from "../api/axios";

export default function Home() {
  const [generatedName, setGeneratedName] = useState("");
  const [generatedDesc, setGeneratedDesc] = useState("");

  const generateName = async () => {
    const res = await api.get("/ai/name");
    setGeneratedName(res.data.name);
  };

  const generateDesc = async () => {
    const res = await api.get("/ai/description");
    setGeneratedDesc(res.data.description);
  };

  return (
    <div className="container">
      <div className="card home-card">
        <h1 className="home-title">Welcome to Anime Hub</h1>
        <p className="home-subtitle">
          Discover anime, explore characters, and generate new ideas with our AI assistant.
        </p>

        <div className="ai-box">
          <h2>✨ AI Anime Generator ✨</h2>

          <div className="ai-buttons">
            <button onClick={generateName}>Generate Anime Name</button>
            <button onClick={generateDesc}>Generate Anime Description</button>
          </div>

          {generatedName && (
            <p className="generated fade-in"><strong>Name:</strong> {generatedName}</p>
          )}

          {generatedDesc && (
            <p className="generated fade-in"><strong>Description:</strong> {generatedDesc}</p>
          )}
        </div>
      </div>
    </div>
  );
}
