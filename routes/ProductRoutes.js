import { Router } from "express";
import auth from "../middleware/auth.js";
import * as c from "../controllers/ProductController.js";
const r = Router();
r.get("/", c.list);
r.post("/", auth, c.create);
r.put("/:id", auth, c.update);
r.delete("/:id", auth, c.remove);
export default r;
