const { ObjectId } = require('mongodb');
const clientPromise = require('../_db.js');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const client = await clientPromise;
  const col = client.db('price_list').collection('products');
  const { id } = req.query;

  if (req.method === 'GET') {
    const doc = await col.findOne({ _id: new ObjectId(id) });
    if (!doc) return res.status(404).json({ error: 'Not found' });
    return res.json({ ...doc, _id: doc._id.toString() });
  }

  if (req.method === 'PATCH') {
    await col.updateOne({ _id: new ObjectId(id) }, { $set: req.body });
    return res.json({ ok: true });
  }

  if (req.method === 'DELETE') {
    await col.deleteOne({ _id: new ObjectId(id) });
    return res.json({ ok: true });
  }

  res.status(405).end();
};
