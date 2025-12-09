import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../config/db.js";
import Title from "../models/Title.js";

await connectDB();

await Title.deleteMany();

await Title.insertMany([
  {
    name: "Attack on Titan",
    type: "anime",
    year: 2013,
    genres: ["action", "dark fantasy"],
    synopsis: "Humanity fights titans in a desperate battle for survival.",
    poster: "/anime/anime1.jpg"
  },
  {
    name: "Harlin Taggar",
    type: "anime",
    year: 2025,
    genres: ["fantasy", "drama"],
    synopsis: "A mysterious warrior discovers her destiny.",
    poster: "/anime/anime2.jpg"
  },
  {
    name: "Demon Slayer",
    type: "anime",
    year: 2019,
    genres: ["action", "adventure"],
    synopsis: "A boy trains to fight demons and save his sister.",
    poster: "/anime/anime3.jpg"
  },
  {
    name: "Forest Guardian",
    type: "anime",
    year: 2024,
    genres: ["fantasy"],
    synopsis: "A young protector of the forest defends ancient secrets.",
    poster: "/anime/anime4.jpg"
  },
  {
    name: "Winter Prince",
    type: "anime",
    year: 2023,
    genres: ["romance", "fantasy"],
    synopsis: "A quiet prince survives the harsh northern winter.",
    poster: "/anime/anime5.jpg"
  },
  {
    name: "Cyber Warrior",
    type: "anime",
    year: 2025,
    genres: ["sci-fi", "action"],
    synopsis: "A brilliant fighter battles rogue machines in the future.",
    poster: "/anime/anime6.jpg"
  }
]);

console.log("✔ Seed completed with LOCAL images");
process.exit();
