import { Router } from "express";
import { Trip } from "../models.js";
import { protect } from "../middleware/auth.js";
const router = Router();
router.get("/", protect, async (req, res) => res.json(await Trip.find({ user: req.userId }).populate("destinations").sort({ createdAt: -1 })));
router.post("/", protect, async (req, res) => {
  const { title, destinations = [], startDate, endDate, budget, notes } = req.body;
  if (!title) return res.status(400).json({ message: "Trip title is required." });
  const trip = await Trip.create({ user: req.userId, title, destinations, startDate, endDate, budget, notes });
  res.status(201).json(await trip.populate("destinations"));
});
export default router;
