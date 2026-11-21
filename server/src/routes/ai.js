import { Router } from "express";
import OpenAI from "openai";
const router = Router();
router.post("/chat", async (req, res) => {
  const message = String(req.body.message || "").trim();
  if (!message) return res.status(400).json({ message: "Write a question first." });
  if (process.env.OPENAI_API_KEY) {
    try {
      const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const result = await client.chat.completions.create({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are TripReview's practical travel assistant. Give safe, realistic itineraries, budget ranges, season advice and ask for missing trip details. Mention that prices and entry rules should be verified." },
          { role: "user", content: message }
        ]
      });
      return res.json({ reply: result.choices[0]?.message?.content || "I could not prepare a response." });
    } catch (e) { console.error(e.message); }
  }
  res.json({ reply: `Here is a starting point for your trip: ${message}\\n\\n1. Choose your travel dates and check seasonal weather.\\n2. Set a daily budget for transport, stay, food and activities.\\n3. Group nearby attractions to reduce travel time.\\n4. Keep one flexible slot each day and verify current opening times before you go.\\n\\nAdd your departure city, dates, number of travellers and budget for a more tailored plan. (Connect an OpenAI API key for AI-generated answers.)` });
});
export default router;
