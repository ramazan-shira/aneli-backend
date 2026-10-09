import { connectDB } from "./config.js";
import User from "./models/User.js";
import { hashPassword } from "./utils/password.js";

const [email, password, name = "Administrator"] = process.argv.slice(2);
if (!email || !password || password.length < 6) {
  console.log(
    "Usage: npm run create-user -- <email> '<password, min 6 chars>' \"Full Name\"",
  );
  process.exit(1);
}
await connectDB();
await User.findOneAndUpdate(
  { email: email.trim().toLowerCase() },
  { name, passwordHash: hashPassword(password), role: "admin" },
  { upsert: true, new: true, setDefaultsOnInsert: true },
);
console.log(
  `User saved in the "users" collection: ${email.trim().toLowerCase()}`,
);
process.exit(0);
