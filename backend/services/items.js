// backend/services/items.js
const db = require('./db');
const helper = require('../helper');

async function insertData(req) {
  const data = req.query;
  const sql = `INSERT INTO coleccion (nombre, marca, tipo, precio) VALUES (?, ?, ?, ?)`;
  const result = await db.query(sql, [
    data.nombre,
    data.marca,
    data.tipo,
    Number(data.precio)
  ]);
  return result.affectedRows;
}

async function getData() {
  const rows = await db.query('SELECT * FROM coleccion', []);
  const data = helper.emptyOrRows(rows);
  return { data };
}

async function deleteData(req) {
  const { id } = req.query;
  const sql = 'DELETE FROM coleccion WHERE id = ?';
  const result = await db.query(sql, [Number(id)]);
  return result.affectedRows;
}

module.exports = {
  insertData,
  getData,
  deleteData
};
