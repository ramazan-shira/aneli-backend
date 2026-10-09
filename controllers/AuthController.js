import User from "../models/User.js";
import wrap from "../middleware/asyncHandler.js";
import { signToken } from "../middleware/auth.js";
import { verifyPassword } from "../utils/password.js";

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
