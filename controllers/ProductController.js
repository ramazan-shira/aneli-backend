import Product from '../models/Product.js';
import wrap from '../middleware/asyncHandler.js';
export const list = wrap(async (_, res) => res.json(await Product.find().sort('createdAt')));
export const create = wrap(async (req, res) => res.status(201).json(await Product.create(req.body)));
export const update = wrap(async (req, res) => res.json(await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })));
export const remove = wrap(async (req, res) => { await Product.findByIdAndDelete(req.params.id); res.json({ ok: true }); });
