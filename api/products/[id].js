const { ObjectId } = require('mongodb');
const clientPromise = require('../_db.js');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const client = await clientPromise;
  const col = client.db('price_list').collection('products');
  const { id } = req.query;

  if (req.method === 'PUT') {
    await col.updateOne({ _id: new ObjectId(id) }, { $set: req.body });
    return res.json({ ok: true });
  }

  if (req.method === 'DELETE') {
    await col.deleteOne({ _id: new ObjectId(id) });
    return res.json({ ok: true });
  }

  res.status(405).end();
};
