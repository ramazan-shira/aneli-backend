import crypto from 'crypto';
import { config } from '../config.js';
const sig = (p) => crypto.createHmac('sha256', config.secret).update(p).digest('hex');
export const signToken = (userId) => { const p = `${userId}.${Date.now() + 864e5}`; return `${p}.${sig(p)}`; };

export default function auth(req, res, next) {
  const [id, exp, s] = (req.headers.authorization || '').replace('Bearer ', '').split('.');
  if (id && exp && s) {
    const good = Buffer.from(sig(`${id}.${exp}`)), got = Buffer.from(s);
    if (good.length === got.length && crypto.timingSafeEqual(good, got) && Date.now() < Number(exp)) { req.userId = id; return next(); }
  }
  res.status(401).json({ error: 'Unauthorized' });
}
