import mongoose from "mongoose";
const { Schema, model } = mongoose;
const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  saved: [{ type: Schema.Types.ObjectId, ref: "Destination" }]
}, { timestamps: true });
const destinationSchema = new Schema({
  name: { type: String, required: true }, country: String, region: String,
  category: [String], description: String, image: String, gallery: [String],
  budget: String, bestTime: String, duration: String, highlights: [String],
  travelTips: [String], latitude: Number, longitude: Number, rating: { type: Number, default: 0 }
}, { timestamps: true });
const reviewSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  destination: { type: Schema.Types.ObjectId, ref: "Destination", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  title: String, body: { type: String, required: true },
  cost: String, travelType: String
}, { timestamps: true });
const tripSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  destinations: [{ type: Schema.Types.ObjectId, ref: "Destination" }],
  startDate: Date, endDate: Date, budget: String, notes: String
}, { timestamps: true });
export const User = model("User", userSchema);
export const Destination = model("Destination", destinationSchema);
export const Review = model("Review", reviewSchema);
export const Trip = model("Trip", tripSchema);
