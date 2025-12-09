import express from "express";

const router = express.Router();

// Mock anime names generator
const names = [
  "Sakura Nights",
  "Blade of Aether",
  "Crimson Destiny",
  "Spirit of the Blue Moon",
  "Shadow Petals",
  "Whisper of the Fallen Star"
];

// Mock anime description generator
const descriptions = [
  "A young warrior discovers an ancient power hidden within their spirit, setting off a journey that changes the fate of the world.",
  "Two strangers bound by destiny must face cosmic forces as their lives intertwine across parallel timelines.",
  "In a city ruled by corrupted magic, a gifted outcast rises to challenge the empire.",
  "A girl who can speak to spirits must prevent the collapse of the world of dreams.",
  "A mysterious relic awakens a long-forgotten war between celestial clans.",
  "An elite fighter questions her purpose after discovering a forbidden truth about her past."
];

// GET random anime name
router.get("/name", (req, res) => {
  const random = names[Math.floor(Math.random() * names.length)];
  res.json({ name: random });
});

// GET random anime description
router.get("/description", (req, res) => {
  const random = descriptions[Math.floor(Math.random() * descriptions.length)];
  res.json({ description: random });
});

export default router;
