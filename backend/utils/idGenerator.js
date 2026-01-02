import Counter from "../models/Counter.js";
import moment from "moment";

export async function generateCustomId(prefix) {
  const today = moment().format("YYYYMMDD");

  // Find and increment counter, create if it doesn't exist
  const counter = await Counter.findOneAndUpdate(
    { prefix, date: today },
    { $inc: { count: 1 } },
    { new: true, upsert: true }
  );

  // Fallback if counter is somehow null
  const count = counter?.count || 1;
  const padded = count.toString().padStart(5, "0");

  return `${prefix}${today}${padded}`;
}