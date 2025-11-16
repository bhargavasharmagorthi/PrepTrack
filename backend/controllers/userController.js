// backend/controllers/userController.js
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { generateCustomId } from "../utils/idGenerator.js";

// ---------------- User Signup ----------------
export const signupUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      secretQuestion,
      secretAnswer,
      phone,
      class: className,
      state,
      city,
      cityOther,
      school,
      darkMode,
      notificationsEnabled,
      emailNotifications,
      whatsappNotifications,
    } = req.body;

    if (!secretQuestion || !secretAnswer)
      return res.status(400).json({ message: "Security question and answer required!" });

    // Check for existing email
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists!" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedAnswer = await bcrypt.hash(secretAnswer, 10);

    const userId = await generateCustomId("ST");
    const avatar = `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`;

    const newUser = new User({
      userId,
      name,
      email,
      phone: phone || "",
      class: className || "",
      state: state || "",
      city: city || "",
      cityOther: cityOther || "",
      school: school || "",
      passwordHash: hashedPassword,
      secretQuestion,
      secretAnswer: hashedAnswer,
      avatar,
      darkMode: darkMode !== undefined ? darkMode : true,
      notificationsEnabled: notificationsEnabled !== undefined ? notificationsEnabled : true,
      emailNotifications: emailNotifications !== undefined ? emailNotifications : false,
      whatsappNotifications: whatsappNotifications !== undefined ? whatsappNotifications : false,
      preferences: {},
      marketingOptIn: { email: false, whatsapp: false },
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully!", userId });
  } catch (err) {
    console.error("Signup User Error:", err);
    res.status(500).json({ message: "Server error!" });
  }
};