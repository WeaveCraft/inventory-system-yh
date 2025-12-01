require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const productsRouter = require('./routes/products');

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/products', productsRouter);

app.get('/', (req, res) => res.json({ status: 'ok', timestamp: new Date() }));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
