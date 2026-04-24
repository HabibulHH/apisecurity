require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const pool = require('./db');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', async (_req, res) => {
  const { rows } = await pool.query('SELECT NOW() AS now');
  res.json({ ok: true, now: rows[0].now });
});

// 🚨 LEVEL 1: Worst case — raw string interpolation, no validation
//String concatenation 
//const query = "SELECT * FROM users WHERE id = " + req.params.id;
// Interpolation 
app.get('/users/:id', async (req, res) => {
  const query = `SELECT * FROM users WHERE id = ${req.params.id}`;
  console.log('[SQL]', query);
  try {
    const result = await pool.query(query);
    res.json({ query, rows: result.rows, rowCount: result.rowCount });
  } catch (err) {
    res.status(500).json({ query, error: err.message, code: err.code });
  }
});

// 🚨 LEVEL 1: Vulnerable login — string concatenation in auth query
app.post('/login', async (req, res) => {
  const { username, password } = req.body || {};
  if (typeof username !== 'string' || typeof password !== 'string') {
    return res.status(400).json({ success: false, message: 'username and password required' });
  }
  const query = 'SELECT id, username, email, role FROM users WHERE username = $1 AND password = $2';
  try {
    const result = await pool.query(query, [username, password]);
    if (result.rowCount > 0) {
      res.json({ success: true, user: result.rows[0] });
    } else {
      res.status(401).json({ success: false, message: 'invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message, code: err.code });
  }
});

// Reset helper — rebuild the users table after a destructive attack
app.post('/reset', async (_req, res) => {
  try {
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await pool.query('DROP TABLE IF EXISTS users');
    await pool.query(schema);
    res.json({ ok: true, message: 'users table reset with seed data' });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message, code: err.code });
  }
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
