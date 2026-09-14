const clientPromise = require('./_db.js');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const client = await clientPromise;
  const col = client.db('price_list').collection('products');

  if (req.method === 'GET') {
    const q = req.query.q;
    const filter = q
      ? { $or: [{ name: { $regex: q, $options: 'i' } }, { category: { $regex: q, $options: 'i' } }] }
      : {};
    const products = await col.find(filter).sort({ name: 1 }).toArray();
    return res.json(products.map(p => ({ ...p, _id: p._id.toString() })));
  }

  if (req.method === 'POST') {
    const result = await col.insertOne({ ...req.body, created_at: new Date().toISOString() });
    return res.json({ _id: result.insertedId.toString() });
  }

  res.status(405).end();
};
