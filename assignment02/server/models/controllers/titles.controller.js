import Title from "../models/Title.js";

// GET all titles
export const getAllTitles = async (req, res) => {
  try {
    const titles = await Title.find();

    // 🔥 PERMANENT FIX: Normalize image paths
    const fixed = titles.map(t => ({
      ...t._doc,
      image: t.image.startsWith("/anime/")
        ? t.image
        : `/anime/${t.image}`
    }));

    res.json(fixed);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET one title
export const getTitle = async (req, res) => {
  try {
    const title = await Title.findById(req.params.id);
    if (!title) return res.status(404).json({ message: "Title not found" });

    // 🔥 Also normalize image here
    const fixed = {
      ...title._doc,
      image: title.image.startsWith("/anime/")
        ? title.image
        : `/anime/${title.image}`
    };

    res.json(fixed);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE title (protected)
export const createTitle = async (req, res) => {
  try {
    const body = {
      ...req.body,
      image: req.body.image.startsWith("/anime/")
        ? req.body.image
        : `/anime/${req.body.image}`
    };

    const newTitle = await Title.create(body);
    res.status(201).json(newTitle);
  } catch (err) {
    res.status(400).json({ message: "Invalid data", error: err.message });
  }
};

// UPDATE title (protected)
export const updateTitle = async (req, res) => {
  try {
    const body = {
      ...req.body,
      image: req.body.image?.startsWith("/anime/")
        ? req.body.image
        : `/anime/${req.body.image}`
    };

    const updated = await Title.findByIdAndUpdate(
      req.params.id,
      body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Title not found" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Invalid data" });
  }
};

// DELETE title (protected)
export const deleteTitle = async (req, res) => {
  try {
    const deleted = await Title.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Title not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
