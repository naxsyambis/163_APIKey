const express = require('express');
const crypto = require('crypto');
const path = require('path');
const mysql = require('mysql2');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ===============================
// 🔗 KONFIGURASI DATABASE
// ===============================
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Bismillah123',
  database: 'api_key_db',
  port: 3309,
});

// Cek koneksi ke MySQL
db.connect((err) => {
  if (err) {
    console.error('❌ Koneksi ke MySQL gagal:', err);
  } else {
    console.log('✅ Terkoneksi ke MySQL (api_key_db)');
  }
});

// ===============================
// 🔑 FUNGSI GENERATE API KEY
// ===============================
function generateApiKey() {
  const randomBytes = crypto.randomBytes(8).toString('hex'); // 16 karakter hex
  return `sk-sm-v1-${randomBytes}`;
}

// ===============================
// 📦 ENDPOINT BUAT API KEY
// ===============================
app.post('/create', (req, res) => {
  const apiKey = generateApiKey();
  const description = req.body?.description || null;

  // Simpan API key ke database
  db.query(
    'INSERT INTO api_keys (api_key, description) VALUES (?, ?)',
    [apiKey, description],
    (err, result) => {
      if (err) {
        console.error('❌ Gagal menyimpan API key:', err);
        return res.status(500).json({ success: false, message: 'Gagal menyimpan API key' });
      }

      console.log(`✅ API Key baru disimpan ke DB: ${apiKey}`);
      res.json({ success: true, apiKey });
    }
  );
});