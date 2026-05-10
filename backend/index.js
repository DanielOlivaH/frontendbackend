// backend/index.js
const express = require('express');
const cors = require('cors');

const loginService = require('./services/login');
const itemsService = require('./services/items');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ ok: true, mensaje: 'API conectada' });
});

// LOGIN
app.get('/login', async (req, res, next) => {
  try {
    res.json(await loginService.login(req));
  } catch (err) {
    console.error('Error /login', err.message);
    next(err);
  }
});

// GET items
app.get('/getItems', async (req, res, next) => {
  try {
    res.json(await itemsService.getData());
  } catch (err) {
    console.error('Error /getItems', err.message);
    next(err);
  }
});

// ADD item
app.get('/addItem', async (req, res, next) => {
  try {
    const filas = await itemsService.insertData(req);
    res.json(filas);
  } catch (err) {
    console.error('Error /addItem', err.message);
    next(err);
  }
});

// DELETE item
app.get('/deleteItem', async (req, res, next) => {
  try {
    const filas = await itemsService.deleteData(req);
    res.json(filas);
  } catch (err) {
    console.error('Error /deleteItem', err.message);
    next(err);
  }
});

const PUERTO = 3030;
app.listen(PUERTO, () => console.log(`API en http://localhost:${PUERTO}`));
