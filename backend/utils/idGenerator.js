import User from "../models/User.js";
import Admin from "../models/Admin.js";
import Agent from "../models/Agent.js";

export const generateCustomId = async (prefix, Model) => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");

  const count = await Model.countDocuments();
  const idNumber = String(count + 1).padStart(5, "0");

  return `${prefix}${yyyy}${mm}${dd}${idNumber}`;
};