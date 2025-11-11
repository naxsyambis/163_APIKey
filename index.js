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
