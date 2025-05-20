const express = require('express');
const formRoutes = require('./routes/form');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/form', formRoutes);

module.exports = app;
