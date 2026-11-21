import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models.js";
import { protect } from "../middleware/auth.js";
const router = Router();
const cookieOptions = { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", maxAge: 7 * 86400000 };
const safe = u => ({ id: u._id, name: u.name, email: u.email });
router.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 6) return res.status(400).json({ message: "Name, valid email and password (6+ characters) are required." });
    if (await User.findOne({ email })) return res.status(409).json({ message: "Email is already registered." });
    const user = await User.create({ name, email, password: await bcrypt.hash(password, 12) });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "dev_secret", { expiresIn: "7d" });
    res.cookie("token", token, cookieOptions).status(201).json({ user: safe(user) });
  } catch (e) { next(e); }
});
router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !await bcrypt.compare(req.body.password || "", user.password)) return res.status(401).json({ message: "Incorrect email or password." });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "dev_secret", { expiresIn: "7d" });
    res.cookie("token", token, cookieOptions).json({ user: safe(user) });
  } catch (e) { next(e); }
});
router.post("/logout", (_, res) => res.clearCookie("token", cookieOptions).json({ message: "Logged out." }));
router.get("/me", protect, async (req, res) => { const u = await User.findById(req.userId); res.json({ user: u ? safe(u) : null }); });
export default router;
