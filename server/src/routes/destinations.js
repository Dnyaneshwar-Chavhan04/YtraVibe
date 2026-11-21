import { Router } from "express";
import { Destination, Review } from "../models.js";
const router = Router();
router.get("/", async (req, res) => {
  const filter = {};
  if (req.query.category && req.query.category !== "All") filter.category = req.query.category;
  if (req.query.q) filter.$or = ["name", "country", "region", "description"].map(k => ({ [k]: { $regex: req.query.q, $options: "i" } }));
  const items = await Destination.find(filter).sort({ name: 1 });
  res.json(items);
});
router.get("/:id", async (req, res, next) => {
  try {
    const item = await Destination.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Destination not found." });
    const reviews = await Review.find({ destination: item._id }).populate("user", "name").sort({ createdAt: -1 });
    res.json({ destination: item, reviews });
  } catch (e) { next(e); }
});
export default router;
