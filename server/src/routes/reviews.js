import { Router } from "express";
import { Review, Destination } from "../models.js";
import { protect } from "../middleware/auth.js";
const router = Router();
router.post("/", protect, async (req, res) => {
  const { destination, rating, title, body, cost, travelType } = req.body;
  if (!await Destination.findById(destination)) return res.status(404).json({ message: "Destination not found." });
  const review = await Review.create({ user: req.userId, destination, rating, title, body, cost, travelType });
  res.status(201).json(await review.populate("user", "name"));
});
router.put("/:id", protect, async (req, res) => {
  const review = await Review.findOneAndUpdate({ _id: req.params.id, user: req.userId }, req.body, { new: true, runValidators: true }).populate("user", "name");
  if (!review) return res.status(404).json({ message: "Review not found or not yours." });
  res.json(review);
});
router.delete("/:id", protect, async (req, res) => {
  const review = await Review.findOneAndDelete({ _id: req.params.id, user: req.userId });
  if (!review) return res.status(404).json({ message: "Review not found or not yours." });
  res.json({ message: "Review deleted." });
});
export default router;
