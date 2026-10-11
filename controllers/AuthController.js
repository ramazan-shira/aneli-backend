import User from "../models/User.js";
import wrap from "../middleware/asyncHandler.js";
import { signToken } from "../middleware/auth.js";
import { hashPassword, verifyPassword } from "../utils/password.js";

const publicUser = (u) => ({
  id: u._id,
  name: u.name,
  email: u.email,
  role: u.role,
});

export const login = wrap(async (req, res) => {
  const email = String(req.body.email || "")
    .trim()
    .toLowerCase();
  const user = await User.findOne({ email });
  if (
    !user ||
    !verifyPassword(String(req.body.password || ""), user.passwordHash)
  )
    return res.status(401).json({ error: "Wrong email or password" });
  res.json({ token: signToken(user._id), name: user.name });
});

export const me = wrap(async (req, res) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  res.json(publicUser(user));
});

export const updateMe = wrap(async (req, res) => {
  const name = String(req.body.name || "").trim();
  if (name.length < 2 || name.length > 60)
    throw new Error("Name must be between 2 and 60 characters");
  const user = await User.findByIdAndUpdate(
    req.userId,
    { name },
    { new: true },
  );
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  res.json(publicUser(user));
});

export const changePassword = wrap(async (req, res) => {
  const { currentPassword = "", newPassword = "" } = req.body;
  if (String(newPassword).length < 6)
    throw new Error("New password must be at least 6 characters");
  const user = await User.findById(req.userId);
  if (!user) return res.status(401).json({ error: "Unauthorized" });
  if (!verifyPassword(String(currentPassword), user.passwordHash))
    throw new Error("Current password is incorrect");
  user.passwordHash = hashPassword(String(newPassword));
  await user.save();
  res.json({ ok: true });
});
