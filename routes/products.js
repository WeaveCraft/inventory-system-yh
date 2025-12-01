// routes/products.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const Joi = require('joi');

// Validation schema
const productSchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  quantity: Joi.number().integer().min(0).required(),
  price: Joi.number().precision(2).min(0).required(),
  category: Joi.string().allow('', null)
});

// GET /products - alla
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM products ORDER BY id');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Fel vid läsning av produkter' });
  }
});

// GET /products/:id - specifik
router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Ogiltigt id' });

  try {
    const { rows } = await db.query('SELECT * FROM products WHERE id = $1', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Produkt hittades inte' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Fel vid hämtning av produkt' });
  }
});

// POST /products - skapa
router.post('/', async (req, res) => {
  const { error, value } = productSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details.map(d => d.message).join(', ') });

  const { name, quantity, price, category } = value;
  try {
    const result = await db.query(
      `INSERT INTO products (name, quantity, price, category) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, quantity, price, category]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Fel vid skapande av produkt' });
  }
});

// PUT /products/:id - uppdatera
router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Ogiltigt id' });

  const { error, value } = productSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details.map(d => d.message).join(', ') });

  const { name, quantity, price, category } = value;
  try {
    const result = await db.query(
      `UPDATE products 
       SET name=$1, quantity=$2, price=$3, category=$4, updated_at=now()
       WHERE id=$5 RETURNING *`,
      [name, quantity, price, category, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Produkt hittades inte' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Fel vid uppdatering av produkt' });
  }
});

// DELETE /products/:id - ta bort
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'Ogiltigt id' });

  try {
    const result = await db.query('DELETE FROM products WHERE id=$1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Produkt hittades inte' });
    res.json({ message: 'Produkten raderades', product: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Fel vid borttagning av produkt' });
  }
});

module.exports = router;
