import 'dotenv/config';
import dns from 'dns';
import mongoose from 'mongoose';

// All configuration lives here. Both MONGO_URI and MONGO_URL are accepted in .env.
export const config = {
  port: process.env.PORT || 4000,
  secret: process.env.SECRET || 'dev-secret-change-me',
  mongoUri: process.env.MONGO_URI || process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/aneli',
};

// Some networks cannot resolve mongodb+srv:// records. Optional fix: DNS_SERVERS=8.8.8.8,1.1.1.1 in .env
if (process.env.DNS_SERVERS) dns.setServers(process.env.DNS_SERVERS.split(',').map((s) => s.trim()));

const hide = (uri) => uri.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@');

function hint(msg) {
  if (/bad auth|Authentication failed/i.test(msg)) return 'Wrong database username or password. If the password has special characters (@ : / ?), URL-encode them.';
  if (/whitelist|not authorized|Server selection timed out|ReplicaSetNoPrimary/i.test(msg)) return 'Atlas is blocking this computer. In Atlas open Security > Network Access and add your current IP address (or 0.0.0.0/0 while developing).';
  if (/querySrv|ENOTFOUND|ECONNREFUSED/i.test(msg) && /srv|mongodb\.net/i.test(msg + config.mongoUri)) return 'DNS could not resolve the Atlas address. Add DNS_SERVERS=8.8.8.8,1.1.1.1 to .env, or use the non-SRV "standard connection string" from Atlas.';
  return 'Check that MONGO_URI (or MONGO_URL) in server/.env is correct.';
}

export async function connectDB() {
  try {
    await mongoose.connect(config.mongoUri, { serverSelectionTimeoutMS: 10000 });
    console.log(`MongoDB connected: ${mongoose.connection.host}/${mongoose.connection.name}`);
  } catch (e) {
    console.error(`\nCannot connect to MongoDB (${hide(config.mongoUri)})\nReason: ${e.message}\nHint: ${hint(e.message)}\n`);
    process.exit(1);
  }
}
