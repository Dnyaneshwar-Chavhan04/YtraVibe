import mongoose from "mongoose";
import dotenv from "dotenv";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { Destination } from "./models.js";

const here = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(here, "../.env") });
const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tripreview";
const data = JSON.parse(await readFile(new URL("./destinations-100.json", import.meta.url), "utf8"));

await mongoose.connect(uri);
try {
  // Upsert by name + country: existing destinations are updated, not deleted.
  for (const destination of data) {
    await Destination.updateOne(
      { name: destination.name, country: destination.country },
      { $set: destination },
      { upsert: true, runValidators: true }
    );
  }
  console.log(`Successfully imported/updated ${data.length} destinations.`);
} finally {
  await mongoose.disconnect();
}
