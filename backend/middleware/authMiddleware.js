import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// -------------------- TOKEN VERIFICATION --------------------
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // { id, role }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// -------------------- ROLE-BASED ACCESS --------------------
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

// -------------------- ADMIN DETAILS EXTRACTION --------------------
// Runs AFTER verifyToken, ONLY for admins
export const attachAdminDetails = async (req, res, next) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can perform this action" });
    }

    // Fetch admin from DB using ObjectId stored in token
    const admin = await Admin.findById(req.user.id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Attach admin details to request
    req.admin = {
      adminId: admin.adminId,
      name: admin.name,
      subject: admin.subject,
    };

    next();
  } catch (err) {
    console.error("attachAdminDetails Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};