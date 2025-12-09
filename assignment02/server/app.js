import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import titleRoutes from "./routes/titles.routes.js";
import reviewRoutes from "./routes/reviews.routes.js";
import aiRoutes from "./routes/ai.routes.js";
import watchlistRoutes from "./routes/watchlist.routes.js";

// Error Handler
import { errorHandler } from "./middleware/error.js";

// -------------------------------------------------------
// INITIAL SETUP
// -------------------------------------------------------
connectDB();

const app = express();

// Fix __dirname inside ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve STATIC IMAGES from server/public/anime
app.use("/anime", express.static(path.join(__dirname, "public/anime")));

app.use(helmet());

//  WORKS FOR LOCAL + NETLIFY
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://assignment02-frontend.netlify.app"
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));

// -------------------------------------------------------
// ROUTES
// -------------------------------------------------------
app.use("/api/auth", authRoutes);
app.use("/api/titles", titleRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/watchlist", watchlistRoutes);

// -------------------------------------------------------
// ERROR HANDLING
// -------------------------------------------------------
app.use(errorHandler);

// -------------------------------------------------------
// START SERVER
// -------------------------------------------------------
app.listen(process.env.PORT || 5000, () =>
  console.log(`API running on port ${process.env.PORT || 5000}`)
);
