import { Router } from "express";
import auth from "../middleware/auth.js";
import * as c from "../controllers/MessageController.js";
const r = Router();
r.post("/", c.create);
r.get("/", auth, c.list);
export default r;
