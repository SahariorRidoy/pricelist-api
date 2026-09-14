module.exports = function handler(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.send(`
    <html>
      <body style="font-family:sans-serif;text-align:center;padding:60px;background:#f5f5f5">
        <h1>🚀 Price List API</h1>
        <p style="color:green;font-size:18px">API is running successfully</p>
        <hr/>
        <p>Available endpoints:</p>
        <ul style="list-style:none;padding:0">
          <li>GET /api/products</li>
          <li>POST /api/products</li>
          <li>PUT /api/products/:id</li>
          <li>DELETE /api/products/:id</li>
        </ul>
      </body>
    </html>
  `);
};
