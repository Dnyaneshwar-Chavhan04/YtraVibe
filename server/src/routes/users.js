import { Router } from "express";
import { User, Destination } from "../models.js";
import { protect } from "../middleware/auth.js";
const router = Router();
router.get("/me/saved", protect, async (req, res) => {
  const u = await User.findById(req.userId).populate("saved");
  res.json(u.saved);
});
router.post("/me/saved/:destinationId", protect, async (req, res) => {
  const d = await Destination.findById(req.params.destinationId);
  if (!d) return res.status(404).json({ message: "Destination not found." });
  const u = await User.findById(req.userId);
  const exists = u.saved.some(id => id.equals(d._id));
  u.saved = exists ? u.saved.filter(id => !id.equals(d._id)) : [...u.saved, d._id];
  await u.save();
  res.json({ saved: !exists });
});
export default router;
