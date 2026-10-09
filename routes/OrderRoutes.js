import { Router } from 'express';
import auth from '../middleware/auth.js';
import * as c from '../controllers/OrderController.js';
const r = Router();
r.post('/', c.create);                       // public
r.post('/manual', auth, c.createManual);
r.get('/', auth, c.list);
r.patch('/:id', auth, c.updateStatus);
r.delete('/:id', auth, c.remove);
export default r;
