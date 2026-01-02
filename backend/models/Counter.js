// backend/models/Counter.js
import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema({
  prefix: { type: String, required: true }, // ST, AD, AG
  date: { type: String, required: true },   // YYYYMMDD
  count: { type: Number, default: 0 }
});

export default mongoose.model("Counter", CounterSchema);