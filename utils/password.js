import crypto from 'crypto';
// Passwords are stored as "salt:hash" (scrypt). Plain passwords are never saved.
export const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString('hex');
  return `${salt}:${crypto.scryptSync(password, salt, 64).toString('hex')}`;
};
export const verifyPassword = (password, stored = '') => {
  const [salt, hash] = stored.split(':');
  if (!salt || !hash) return false;
  const test = crypto.scryptSync(password, salt, 64), real = Buffer.from(hash, 'hex');
  return test.length === real.length && crypto.timingSafeEqual(test, real);
};
