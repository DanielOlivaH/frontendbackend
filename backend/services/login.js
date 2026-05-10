// backend/services/login.js
const db = require('./db');
const helper = require('../helper');

async function login(req) {
  const { user, password } = req.query;

  // IMPORTANTE: en esta base de datos, la columna del usuario se llama 'login'
  const sql = 'SELECT nombre, rol FROM usuarios WHERE login = ? AND password = ?';

  const rows = await db.query(sql, [user, password]);

  const data = helper.emptyOrRows(rows);
  return { data };
}

module.exports = { login };
