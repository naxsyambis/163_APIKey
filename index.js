const express = require('express');
const crypto = require('crypto');
const path = require('path');
const mysql = require('mysql2');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));