import Order, { STATUSES } from "../models/Order.js";
import Product from "../models/Product.js";
import wrap from "../middleware/asyncHandler.js";

async function priceItems(items = []) {
  const out = [];
  for (const i of items) {
    const p = await Product.findById(i.product);
    if (p && i.qty > 0)
      out.push({
        product: p._id,
        name: p.name,
        price: p.price,
        qty: Math.floor(i.qty),
      });
  }
  if (!out.length) throw new Error("No valid items");
  return out;
}
const totalOf = (items) =>
  Math.round(items.reduce((s, i) => s + i.price * i.qty, 0) * 100) / 100;

export const create = wrap(async (req, res) => {
  const { customerName, phone, address, items } = req.body;
  if (!customerName || !phone) throw new Error("Name and phone are required");
  const priced = await priceItems(items);
  const o = await Order.create({
    customerName,
    phone,
    address,
    items: priced,
    total: totalOf(priced),
  });
  res.status(201).json({ id: o._id });
});
export const createManual = wrap(async (req, res) => {
  const priced = await priceItems(req.body.items);
  res.status(201).json(
    await Order.create({
      ...req.body,
      items: priced,
      total: totalOf(priced),
      source: "phone",
    }),
  );
});
export const list = wrap(async (_, res) =>
  res.json(await Order.find().sort("-createdAt")),
);
export const updateStatus = wrap(async (req, res) => {
  if (!STATUSES.includes(req.body.status)) throw new Error("Invalid status");
  res.json(
    await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true },
    ),
  );
});
export const remove = wrap(async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ ok: true });
});
