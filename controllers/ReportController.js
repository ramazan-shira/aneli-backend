import Order from '../models/Order.js';
import Product from '../models/Product.js';
import wrap from '../middleware/asyncHandler.js';

const perDay = (match) => Order.aggregate([
  { $match: match },
  { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, orders: { $sum: 1 }, revenue: { $sum: '$total' } } },
  { $sort: { _id: 1 } }]);

export const stats = wrap(async (_, res) => {
  const since = new Date(Date.now() - 30 * 864e5); since.setHours(0, 0, 0, 0);
  const inMonth = { createdAt: { $gte: since } };
  const [products, recent, open, daily, byStatus, top, latest] = await Promise.all([
    Product.countDocuments(), Order.find(inMonth), Order.countDocuments({ status: { $ne: 'delivered' } }), perDay(inMonth),
    Order.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]),
    Order.aggregate([{ $match: inMonth }, { $unwind: '$items' },
      { $group: { _id: '$items.name', qty: { $sum: '$items.qty' } } }, { $sort: { qty: -1 } }, { $limit: 5 }]),
    Order.find().sort('-createdAt').limit(5)]);
  res.json({ products, ordersLastMonth: recent.length, revenueLastMonth: Math.round(recent.reduce((s, o) => s + o.total, 0) * 100) / 100,
    pending: open, daily, byStatus, top, latest });
});
// GET /api/reports?from=YYYY-MM-DD&to=YYYY-MM-DD  -> orders + revenue per day
export const byDay = wrap(async (req, res) => {
  const from = new Date(req.query.from), to = new Date(req.query.to); to.setHours(23, 59, 59, 999);
  res.json(await perDay({ createdAt: { $gte: from, $lte: to } }));
});
