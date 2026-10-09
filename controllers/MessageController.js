import Message from "../models/Message.js";
import wrap from "../middleware/asyncHandler.js";
export const create = wrap(async (req, res) => {
  await Message.create(req.body);
  res.status(201).json({ ok: true });
});
export const list = wrap(async (_, res) =>
  res.json(await Message.find().sort("-createdAt")),
);
