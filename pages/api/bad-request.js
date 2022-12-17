export default function handler(req, res) {
  const { message = "Bad request" } = req.query;

  res.status(400).json({ ok: false, message });
}
