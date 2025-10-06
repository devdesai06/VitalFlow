// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// 🩸 Route to add a donor
app.post('/add-donor', (req, res) => {
  const { name, age, phone, state, district, blood_group, blood_component } = req.body;

  if (!name || !age || !phone || !state || !district || !blood_group || !blood_component) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = `
    INSERT INTO donors (name, age, phone, state, district, blood_group, blood_component)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, age, phone, state, district, blood_group, blood_component], (err, result) => {
    if (err) {
      console.error('❌ Error inserting donor:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: '✅ Donor registered successfully!' });
  });
});

// 🩸 Route to search donors
app.post('/search-donors', (req, res) => {
  const { state, district, blood_group, blood_component } = req.body;

  let query = 'SELECT * FROM donors WHERE 1=1';
  const params = [];

  if (state && state !== 'Select State') {
    query += ' AND state = ?';
    params.push(state);
  }
  if (district && district !== 'Select District') {
    query += ' AND district = ?';
    params.push(district);
  }
  if (blood_group && blood_group !== 'Select Blood Group') {
    query += ' AND blood_group = ?';
    params.push(blood_group);
  }
  if (blood_component && blood_component !== 'Select Blood Component') {
    query += ' AND blood_component = ?';
    params.push(blood_component);
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error('❌ Error searching donors:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ donors: results });
  });
});

// Start Server
const PORT = 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
