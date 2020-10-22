const path = require('path');

const express = require('express');
require('dotenv').config();

const app = express();

app.use(require('body-parser').urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.send('Homepage');
});

app.use((req, res, next) => {
  res.status(404).send('404');
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running at PORT: ${process.env.PORT}`);
});