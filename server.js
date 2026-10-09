import express from 'express';
import cors from 'cors';
import { config, connectDB } from './config.js';
import User from './models/User.js';
import productRoutes from './routes/ProductRoutes.js';
import orderRoutes from './routes/OrderRoutes.js';
import messageRoutes from './routes/MessageRoutes.js';
import authRoutes from './routes/AuthRoutes.js';
import reportRoutes from './routes/ReportRoutes.js';

const app = express();
app.use(cors(), express.json({ limit: '6mb' }));
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', messageRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reports', reportRoutes);

await connectDB();
if (!(await User.countDocuments())) console.log("\nNo users yet. Create the first admin:\n  npm run create-user -- you@example.com 'YourPassword' \"Your Name\"\n");
app.listen(config.port, () => console.log(`API on http://localhost:${config.port}`));
