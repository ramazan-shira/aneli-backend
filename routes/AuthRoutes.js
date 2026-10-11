import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  login,
  me,
  updateMe,
  changePassword,
} from "../controllers/AuthController.js";
const r = Router();
r.post("/login", login);
r.get("/me", auth, me);
r.put("/me", auth, updateMe);
r.put("/password", auth, changePassword);
export default r;
