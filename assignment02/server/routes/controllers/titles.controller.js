import Title from "../models/Title.js";

// GET all titles
export const getAllTitles = async (req, res) => {
  try {
    const titles = await Title.find();
    res.json(titles);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET one title
export const getTitle = async (req, res) => {
  try {
    const title = await Title.findById(req.params.id);
    if (!title) return res.status(404).json({ message: "Title not found" });
    res.json(title);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE title (protected)
export const createTitle = async (req, res) => {
  try {
    const newTitle = await Title.create(req.body);
    res.status(201).json(newTitle);
  } catch (err) {
    res.status(400).json({ message: "Invalid data", error: err.message });
  }
};

// UPDATE title (protected)
export const updateTitle = async (req, res) => {
  try {
    const updated = await Title.findByIdAndUpdate(
      req.params.id,
      req.body,
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
