import { Router } from 'express';
import auth from '../middleware/auth.js';
import * as c from '../controllers/ReportController.js';
const r = Router(); r.use(auth);
r.get('/stats', c.stats);
r.get('/', c.byDay);
export default r;
